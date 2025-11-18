import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { stranger_tune } from "./tunes";
import console_monkey_patch, { getD3Data } from "./console-monkey-patch";

// Components
import PlayButtons from "./components/PlayButtons";
import ProcButtons from "./components/ProcButtons";
import PreprocessText from "./components/PreprocessText";
import PadButton from "./components/PadButton";
import Navbar from "./components/Navbar";
import PerformanceControls from "./components/PerformanceControls";
import CustomSlider from "./components/CustomSlider";

let globalEditor = null;

const handleD3Data = (event) => {
  console.log(event.detail);
};

export default function StrudelDemo() {
  const hasRun = useRef(false);

  // Colour presets for pad buttons.
  const padColours = [
    {
      primary: "#ffb8d7",
      secondary: "#a109a3",
      tertiary: "#a009a3a0",
    },
    {
      primary: "#f3f874ff",
      secondary: "#d2d900",
      tertiary: "#d2d900b0",
    },
    {
      primary: "#97f4efff",
      secondary: "#01c6bd",
      tertiary: "#01c6bcaf",
    },
    {
      primary: "#92fab6ff",
      secondary: "#01ac3c",
      tertiary: "#01ac3da4",
    },
  ];

  // Keep track of original code for processing.
  const [originalNotes, setOriginalNotes] = useState(stranger_tune);
  const [musicNotes, setMusicNotes] = useState(stranger_tune);

  const [volume, setVolume] = useState(0.5);
  const [cps, setCps] = useState(0.58);
  const [reverb, setReverb] = useState(0.4);
  const [lpf, setLpf] = useState(2000);

  // Presets of instrument states
  const [instrumentToggles, setInstrumentToggles] = useState({});

  const handlePlay = () => {
    if (globalEditor) {
      globalEditor.evaluate();
    }
  };

  const handleStop = () => {
    globalEditor.stop();
  };

  const extractInstruments = (code) => {
    const matches = [...code.matchAll(/<\$(.*?)\$>/g)];
    return matches.map((m) => m[1]);
  };
  const handlePadToggle = (name, newState) => {
    setInstrumentToggles((prev) => ({ ...prev, [name]: newState }));
  };

  useEffect(() => {
    // UI Logic for adding pads.
    const instruments = extractInstruments(originalNotes);
    setInstrumentToggles((prev) => {
      const updated = { ...prev };
      instruments.forEach((name) => {
        if (!(name in updated)) updated[name] = true; // default ON
      });
      return updated;
    });
  }, [originalNotes]);

  const handleProc = () => {
    let processedCode = originalNotes;
    processedCode = processedCode.replace(
      "//volume",
      `all(x => x.gain(${volume}))`
    );
    processedCode = processedCode.replace("//tempo", `setcps(${cps})`);
    processedCode = processedCode.replace(
      "//reverb",
      `all(x => x.room(${reverb}))`
    );
    processedCode = processedCode.replace("//lpf", `all(x => x.lpf(${lpf}))`);

    // Loop through all instrument toggles.
    for (const instrument in instrumentToggles) {
      const isActive = instrumentToggles[instrument];
      const placeholder = `<$${instrument}$>`;

      // Replace the placeholder with "_" to make instrument inactive.
      if (!isActive) {
        processedCode = processedCode.replaceAll(placeholder, "_");
      } else {
        // Remove the placeholder to make the instrument active.
        processedCode = processedCode.replaceAll(placeholder, "");
      }
    }

    if (globalEditor) {
      globalEditor.setCode(processedCode);
    }
    setMusicNotes(processedCode);
  };

  const handleProcAndPlay = () => {
    if (globalEditor) {
      console.log(globalEditor);
      handleProc();
      handlePlay();
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
      //init canvas
      const canvas = document.getElementById("roll");
      canvas.width = canvas.width * 2;
      canvas.height = canvas.height;
      const drawContext = canvas.getContext("2d");
      const drawTime = [-2, 2]; // time window of drawn haps
      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById("editor"),
        drawTime,
        onDraw: (haps, time) =>
          drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
        prebake: async () => {
          initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
          const loadModules = evalScope(
            import("@strudel/core"),
            import("@strudel/draw"),
            import("@strudel/mini"),
            import("@strudel/tonal"),
            import("@strudel/webaudio")
          );
          await Promise.all([
            loadModules,
            registerSynthSounds(),
            registerSoundfonts(),
          ]);
        },
      });
    }
    globalEditor.setCode(musicNotes);
  }, [musicNotes]);

  // Update player when an instrument state changes.
  useEffect(() => {
    handleProcAndPlay();
  }, [instrumentToggles]);

  const handleExport = (downloadRef) => {
    const toExport = {
      settings: {
        volume,
        cps,
        reverb,
        lpf,
      },
      instruments: instrumentToggles,
      originalCode: originalNotes,
    };

    const json = JSON.stringify(toExport);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = downloadRef.current;
    link.href = url;
    link.download = "strudel_preset.json";
    link.click();

    // Free memory from BLOB.
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Navbar onExport={handleExport} />
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ overflowY: "auto" }}>
              <PreprocessText
                defaultValue={originalNotes}
                handleChange={(e) => setOriginalNotes(e.target.value)}
              />
              <div
                className="row-md-8 mt-3"
                style={{ maxHeight: "50vh", overflowY: "auto" }}
              >
                <div id="editor" />
                <div id="output" />
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="row pad-btn-container element"
                style={{ textAlign: "center" }}
              >
                <h2 className="element-title">Instrument Pad</h2>
                <div className="pad-container">
                  {/* Map out all pad buttons on the UI */}
                  {Object.entries(instrumentToggles).map(
                    ([name, isActive], index) => (
                      <PadButton
                        key={name}
                        onToggle={() => handlePadToggle(name, !isActive)}
                        active={isActive}
                        colours={padColours[index % 4]}
                        label={name}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="row">
                <div className="canvas-container">
                  <canvas id="roll"></canvas>
                </div>
                <nav className="controls-container">
                  <ProcButtons
                    onProc={handleProc}
                    onProcPlay={handleProcAndPlay}
                  />
                  <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                </nav>

                {/* Volume Slider */}
                <CustomSlider
                  label="Volume"
                  min={0}
                  max={1}
                  step={0.05}
                  displayValue={volume * 100}
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value);
                  }}
                  onMouseUp={handleProcAndPlay}
                />
              </div>
              <PerformanceControls
                cps={cps}
                reverb={reverb}
                lpf={lpf}
                setCps={setCps}
                setReverb={setReverb}
                setLpf={setLpf}
                handleProcAndPlay={handleProcAndPlay}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
