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

let globalEditor = null;

const handleD3Data = (event) => {
  console.log(event.detail);
};

export default function StrudelDemo() {
  const hasRun = useRef(false);

  const [originalNotes, setOriginalNotes] = useState(stranger_tune);
  const [musicNotes, setMusicNotes] = useState(stranger_tune);

  const [instrunmentToggles, setInstrunmentToggles] = useState({
    bass: true,
    arp: true,
    drums1: false,
  });

  const handlePlay = () => {
    if (globalEditor) {
      globalEditor.evaluate();
    }
  };

  const handleStop = () => {
    globalEditor.stop();
  };

  const handleProc = () => {
    let processedCode = originalNotes;

    if (!instrunmentToggles.bass) {
      processedCode = processedCode.replaceAll("<pad_bass>", "_");
    } else {
      processedCode = processedCode.replaceAll("<pad_bass>", "");
    }
    if (!instrunmentToggles.arp) {
      processedCode = processedCode.replaceAll("<pad_arp>", "_");
    } else {
      processedCode = processedCode.replaceAll("<pad_arp>", "");
    }
    if (!instrunmentToggles.drums1) {
      processedCode = processedCode.replaceAll("<pad_drums1>", "_");
    } else {
      processedCode = processedCode.replaceAll("<pad_drums1>", "");
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

  const handlePadToggle = (name, newState) => {
    setInstrunmentToggles((prev) => ({ ...prev, [name]: newState }));
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
      canvas.height = canvas.height * 2;
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

      // document.getElementById("proc").value = stranger_tune;
      //   SetupButtons();
      //   Proc();
    }
    // handleProc();
    globalEditor.setCode(musicNotes);
  }, [musicNotes]);

  useEffect(() => {
    handleProcAndPlay();
  }, [instrunmentToggles]);

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <PreprocessText
                defaultValue={originalNotes}
                handleChange={(e) => setOriginalNotes(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <nav>
                <ProcButtons
                  onProc={handleProc}
                  onProcPlay={handleProcAndPlay}
                />
                <br />
                <PlayButtons onPlay={handlePlay} onStop={handleStop} />
              </nav>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <div id="editor" />
              <div id="output" />
            </div>
            <div className="col-md-4">
              <PadButton
                onToggle={() => handlePadToggle("arp", !instrunmentToggles.arp)}
                active={instrunmentToggles.arp}
              />
              <PadButton
                onToggle={() =>
                  handlePadToggle("bass", !instrunmentToggles.bass)
                }
                active={instrunmentToggles.bass}
              />
              <PadButton
                onToggle={() =>
                  handlePadToggle("drums1", !instrunmentToggles.drums1)
                }
                active={instrunmentToggles.drums1}
              />
            </div>
          </div>
        </div>
        <canvas id="roll"></canvas>
      </main>
    </div>
  );
}
