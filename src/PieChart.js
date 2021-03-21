import React from "react";
import { group, pie, arc } from "d3";
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

  const groupings = group(data, d => d.icon);
  const totals = [...groupings]
    .map(([name, value]) => ({ name, value: value.length }))
    .sort((a,b) => b.value - a.value);

  const pieData = [
    ...totals.slice(0, 4),
    {
      name: "other",
      value: totals.slice(4).reduce((acc, cur) => { return acc + cur.value; }, 0)
    }
  ];

  const sliceGenerator = pie().padAngle(0.005).value(d => d.value);
  const pieSlices = sliceGenerator(pieData);

  const radius = chartSize.width / 2;
  const arcSVGData = arc().innerRadius(radius * 0.6).outerRadius(radius);

  const arcLabel = (slice, centroid, index) => {
    const x = centroid(slice)[0] - Math.ceil((slice.data.value.toString().length / 2) * 10);
    const y = centroid(slice)[1] + 5;
    return (
      <text
        key={`label${index}`}
        transform={`translate(${x},${y})`}
        fontSize="22px"
        fill="white"
      >
        {slice.data.value}
      </text>
    );
  };

  const colors = ['#737CA1','#566D7E','#616D7E','#98AFC7','#837E7C'];

  return (
    <div>
      <h1>Pie chart example</h1>
      <svg width={canvasSize.width} height={canvasSize.height}>
        <g transform={`translate(${margin},0)`}>
          <g transform={`translate(${chartSize.height / 2}, ${chartSize.width / 2})`}>
            {pieSlices.map((slice, index) => (
              <g key={index}>
                <path
                  key={`slice${index}`}
                  fill={colors[index]}
                  d={arcSVGData(slice)}
                />
                { arcLabel(slice, arcSVGData.centroid, index) }
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};