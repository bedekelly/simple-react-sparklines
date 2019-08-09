import React, { useState } from "react";
import "./App.scss";
import SparkLine from "./SparkLine";
import stockData from "./stockData.json";

function Stock() {
  return (
    <>
      <SparkLine data={stockData} />{" "}
    </>
  );
}

function App() {
  const [fontSize, setFontSize] = useState(18);

  return (
    <div className="App">
      <h1>Header</h1>
      Font size:
      <input
        type="range"
        min={5}
        max={30}
        value={fontSize}
        onChange={event => setFontSize(event.target.value)}
      />
      <p style={{ fontSize: `${fontSize}px` }}>
        The FTSE100
        <Stock />
        dipped sharply after several lorem ipsum dolor sit amet, consectetur
        adipisicing elit. A accusamus blanditiis deserunt dolore ea et harum
        illo in inventore, ipsam, laborum laudantium nostrum omnis, placeat quae
        sit tenetur totam voluptate?
      </p>
    </div>
  );
}

export default App;
