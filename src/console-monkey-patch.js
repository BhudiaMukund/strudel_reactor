let originalLog = null;

export default function console_monkey_patch() {
  if (originalLog) return;
  originalLog = console.log;

  console.log = function (...args) {
    const line = args.join(" ");

    if (line.startsWith("%c[hap] ")) {
      // Find gain: and postgain:
      const gainMatch = line.match(/gain:(\d+(\.\d+)?)/);
      const postGainMatch = line.match(/postgain:(\d+(\.\d+)?)/);

      let gain = gainMatch ? Number(gainMatch[1]) : null;
      let postgain = postGainMatch ? Number(postGainMatch[1]) : 1;

      if (gain !== null) {
        const amplitude = gain * postgain;
        const time = performance.now() / 1000;

        const event = new CustomEvent("d3Data", {
          detail: { time, amplitude }
        });

        document.dispatchEvent(event);
      }
    }
    originalLog.apply(console, args);
  };
}
