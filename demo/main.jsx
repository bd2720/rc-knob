import React from "react";
import ReactDOM from "react-dom/client";
import { ExampleKnob } from "./ExampleKnob";

function App() {
  const [val, setVal] = React.useState(0);
  const [show, setShow] = React.useState(true);

  return (
    <div style={{ padding: 40 }}>
      <h1>Knob Test</h1>
      {show && (
        <ExampleKnob
          label="Test"
          value={val}
          onChange={setVal}
        />
      )}
      <p>Value: {val}</p>
      <button onClick={() => setVal(Math.floor(Math.random()*24) - 12)}>Set New Value</button>
      <button onClick={() => setShow(s => !s)}>{ show ? "Hide" : "Show"}</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
