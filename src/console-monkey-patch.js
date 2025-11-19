let originalLog = null;

export default function console_monkey_patch() {
  if (originalLog) return;
  originalLog = console.log;

  console.log = function (...args) {
    const line = args.join(" ");

    // Only process Strudel hap messages
    if (line.startsWith("%c[hap] ")) {
      // Find gain: and postgain:
      const gainMatch = line.match(/gain:(\d+(\.\d+)?)/);
      const postGainMatch = line.match(/postgain:(\d+(\.\d+)?)/);

      let gain = gainMatch ? Number(gainMatch[1]) : null;
      let postgain = postGainMatch ? Number(postGainMatch[1]) : 1;

      // If gain exists, process a simple amplitude measure.
      if (gain !== null) {
        const amplitude = gain * postgain;
        const time = performance.now() / 1000;

        // Send data to the React graph
        const event = new CustomEvent("d3Data", {
          detail: { time, amplitude }
        });

        document.dispatchEvent(event);
      }
    }
    originalLog.apply(console, args);
  };
}
