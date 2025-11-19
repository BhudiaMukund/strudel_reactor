
# Strudel Reactor  
*A react based live coding music player with instrument pads & a real-time graph.*

---

## Overview
Strudel Reactor lets users load Strudel code, toggle instruments, adjust global audio controls, and visualise the sound using a live D3 graph. It supports the preset import/export and provides an excellent UI.

---

## Features
- **Live Strudel code editor** (StrudelMirror)
- **Performance controls:** Volume, Tempo (CPS), Reverb, Low-Pass Filter (LPF)
- **Instrument pads** generated automatically from <\$name\$> markers
- **Ripple animation** on pad click
- **D3.js audio graph** showing amplitude activity
- **Preset import/export system**
- **Bootstrap toasts** for notifications

---

## Installation & Running the App
### **1. Download & Extract**
Download the project ZIP and extract it on your pc.

### **2. Install Dependencies**
Open a terminal in the extracted project folder:

``
npm install
``

### **3. Start the Development Server**
``
npm start
``

The app will automatically open at:

**http://localhost:3000/**

---

## Placeholder Controls
Songs must include these comment markers:

```
//volume
//tempo
//reverb
//lpf
```

The app replaces them with Strudel code:

|Placeholder|Injected Code|
|-|-|
|//volume|all(x => x.gain(V))|
|//tempo|setcps(CPS)|
|//reverb|all(x => x.room(R)) |
|//lpf|all(x => x.lpf(F)) |

This allows global sliders to modify the entire composition.

---

## Instrument Pads (\<\$name\$>)
Wrap any instrument with:

```
<$lead$>lead: ...
<$drums$>drums: ...
```

- Pads toggle instruments ON/OFF  
- When OFF - placeholder becomes "_"  
- When ON - placeholder is removed  
- Pads have ripple click animations  

---

## D3 Graph
The graph shows **amplitude peaks** extracted from the Strudel logs.

Effects on the graph:
- **Volume** - height of peaks
- **LPF** - smoothness of the graph peaks
- **Tempo** - changes the number of peaks per second  
- **Pads** - muting removes the graph activity  

---

## Presets
Export/import JSON with:

```
{
  "settings": { "volume":0.5, "cps":0.6, "reverb":0.4, "lpf":2000 },
  "instruments": { "lead": true, "drums": false },
  "originalCode": "..."
}
```

Will restore the full session exactly.

---

## Tech Stack
- React  
- Strudel  
- D3.js  
- Bootstrap + Styled Components  

---
