import React from "react";
import * as d3 from "d3";
import data from './data/my_weather_data.json';

export default function PieChart() {
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

  const iconAccessor = d => d.icon;
  const datasetGroup = d3.group(data, iconAccessor);
  const datasetByIcon = [...datasetGroup]
    .map(([name, value]) => ({ name, value: value.length }))
    .sort((a,b) => b.value - a.value);
  const otherCount = datasetByIcon.slice(4).reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  const combinedDatasetByIcon = [
    ...datasetByIcon.slice(0, 4),
    {
      name: "other",
      value: otherCount
    }
  ];

  const arcGenerator = d3.pie()
    .padAngle(0.005)
    .value(d => d.value);

  const arcs = arcGenerator(combinedDatasetByIcon);

  const radius = chartSize.width / 2;
  const arc = d3.arc().innerRadius(radius * 0.7).outerRadius(radius);

  return (
    <div>
      <h1>Pie chart example</h1>
      <svg width={canvasSize.width} height={canvasSize.height}>
        <g transform={`translate(${margin},0)`}>
          <g transform={`translate(${chartSize.height / 2}, ${chartSize.width / 2})`}>
            {arcs.map((d, i) => (
              <g key={i}>
                <path
                  key={`arc${i}`}
                  fill="#dadadd"
                  d={arc(d)}
                />
                <text
                  key={`label${i}`}
                  transform={`translate(${arc.centroid(d)})`}
                >
                  {d.data.value}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};