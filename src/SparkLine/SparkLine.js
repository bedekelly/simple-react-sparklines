import React from "react";
import PropTypes from "prop-types";
import "./SparkLine.css";

/**
 * Linearly map a value from one range to another.
 */
function linMap(value, fromLower, fromUpper, toLower, toUpper) {
  const lowerRange = fromUpper - fromLower;
  const upperRange = toUpper - toLower;
  const magnitudeThroughLowerRange = value - fromLower;
  const fractionThroughRange = magnitudeThroughLowerRange / lowerRange;
  const magnitudeThroughUpperRange = fractionThroughRange * upperRange;
  return toLower + magnitudeThroughUpperRange;
}

export default function SparkLine({ data, trailingSpace, min, max, ...props }) {
  const height = 75;
  const width = 270;

  const dataMax = max === undefined ? Math.max(...data) : max;
  const dataMin = min === undefined ? Math.min(...data) : min;
  const coords = data.map(d => ({ y: linMap(d, dataMin, dataMax, height, 0) }));
  let xValue = 0;

  coords.forEach(c => {
    c.x = xValue;
    xValue += width / data.length;
  });
  const { x, y } = coords[coords.length - 1];

  const points = coords.map(({ x, y }) => `${x},${y}`).join(" ");
  const viewBox = `-2 -2 ${width + 12} ${height + 2}`;

  return (
    <>
      <svg className={"spark-line"} viewBox={viewBox} {...props}>
        <polyline className={"spark-line-poly"} points={points} />
        <circle cx={x} cy={y} r={10} />
      </svg>
      {trailingSpace ? " " : null}
    </>
  );
}

SparkLine.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  trailingSpace: PropTypes.bool.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
};

SparkLine.defaultProps = {
  trailingSpace: true
};
