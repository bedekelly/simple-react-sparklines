import SimplexNoise from "simplex-noise";
import React, { useState, useEffect } from "react";

import "./App.scss";
import SparkLine from "./SparkLine";


const simplex = new SimplexNoise();


function noiseForAngle(angle) {
  return simplex.noise2D(Math.cos(angle), Math.sin(angle));
}


function trail(number, length, step) {
  const trail = [];
  for (let num=0; num<length; num++) {
    trail.push(number - num * step)
  }
  return trail;
}


function generateData(angle) {
  return trail(angle, 90, -0.06).map(noiseForAngle);
}


function Noise() {
  const [angle, setAngle] = useState(0);
  const data = generateData(angle);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAngle(a => a + 0.06));
    return () => cancelAnimationFrame(id)
  }, [angle]);

  return (
    <>
      <SparkLine min={-1} max={1} data={data} />{" "}
    </>
  );
}

function App() {
  const [fontSize, setFontSize] = useState(30);

  return (
    <div className="App">
      <h1>Header</h1>
      Font size:
      <input
        type="range"
        min={14}
        max={30}
        value={fontSize}
        onChange={event => setFontSize(event.target.value)}
      />
      <p style={{ fontSize: `${fontSize}px` }}>
        The FTSE100
        <Noise />
        dipped sharply after several rallies earlier this dolor sit amet,
        consectetur adipisicing elit. A accusamus blanditiis deserunt dolore ea
        et harum illo in inventore, ipsam, laborum laudantium nostrum omnis,
        placeat quae sit tenetur totam voluptate?
      </p>
    </div>
  );
}

export default App;
