import React from "react";
import * as d3 from "d3";
import data from './data/my_weather_data.json';

// The labels on both axis are still not in the right place
export default function ScatterChart() {
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

  const xData = (d) => d.dewPoint;
  const yData = (d) => d.humidity;
  const xScale = d3.scaleLinear().domain(d3.extent(data, xData)).range([0, chartSize.width]).nice();
  const yScale = d3.scaleLinear().domain(d3.extent(data, yData)).range([chartSize.height, 0]).nice();

  const xTicks = xScale.ticks(chartSize.width / 25);
  const yTicks = yScale.ticks(chartSize.height / 25);

  return (
    <div>
      <h1>Scatter chart example</h1>
      <svg width={canvasSize.width} height={canvasSize.height}>
        <g transform={`translate(${margin},0)`}>
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(xData(d))}
              cy={yScale(yData(d))}
              r="5"
            />
          ))}
        </g>
        <g transform={`translate(0,${chartSize.height})`}>
          <line
            x2={chartSize.width}
            stroke="black"
          />
          {xTicks.map((tick, i) => (
            <text
              style={{fontSize: "0.8em"}}
              key={tick}
              transform={`translate(${xScale(tick)}, 25)`}
            >
              {tick}
            </text>
          ))}
        </g>
        <g>
          <line
            y2={chartSize.height}
            stroke="black"
          />
          {yTicks.map((tick, i) => (
            <text
              style={{fontSize: "0.8em"}}
              key={tick}
              transform={`translate(10, ${yScale(tick)})`}
            >
              {tick}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};
