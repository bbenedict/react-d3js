import React from "react";
import * as d3 from "d3";
import data from './data/my_weather_data.json';

// The labels on both axis are still not in the right place
export default function BarChart() {
  const size = 600;
  const margin = 50;

  const canvasSize = {
    width: size,
    height: size,
  };

  const chartSize = {
    width: canvasSize.width - (2 * margin),
    height: canvasSize.height - (2 * margin)
  };

  const xData = (d) => d.humidity;
  const yData = (d) => d.length;
  const numberOfThresholds = 6;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xData))
    .range([0, chartSize.width])
    .nice(numberOfThresholds);

  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(xData)
    .thresholds((data, min, max) => d3.range(numberOfThresholds).map(t => min + (t / numberOfThresholds) * (max - min)));
    //.thresholds(numberOfThresholds);  // This allows d3 to use best guess near the numberOfThresholds

  const bins = binsGenerator(data);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yData)])
    .range([chartSize.height, 0])
    .nice();

  const barPadding = 2;

  return (
    <div>
      <h1>Bar chart example</h1>
      <svg width={canvasSize.width} height={canvasSize.height}>
        <g transform={`translate(${margin},0)`}>
          {bins.map((d, i) => (
            <rect
              key={i}
              x={xScale(d.x0) + barPadding}
              y={yScale(yData(d))}
              width={d3.max([xScale(d.x1) - xScale(d.x0) - barPadding, 0])}
              height={d3.max([chartSize.height - yScale(yData(d)), 0])}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
