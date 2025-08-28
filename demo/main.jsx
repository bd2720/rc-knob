import React from "react";
import ReactDOM from "react-dom/client";
import { ExampleKnob } from "./ExampleKnob";

function App() {
  const [val, setVal] = React.useState(0);

  return (
    <div style={{ padding: 40 }}>
      <h1>Knob Test</h1>
      <ExampleKnob
        label="Test"
        value={val}
        onChange={setVal}
      />
      <p>Value: {val}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
