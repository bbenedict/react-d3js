import React from "react";
import { pie, arc } from "d3";

// Single value doughnut chart
export default function DoughnutChart() {
  const size = 300;
  const margin = 20;

  const canvasSize = {
    width: size,
    height: size,
  };

  const chartSize = {
    width: canvasSize.width - (2 * margin),
    height: canvasSize.height - (2 * margin)
  };

  const people = 459;
  const percentComplete = 0.45;
  const peopleComplete = Math.floor(people * percentComplete);
  const peopleRemaining = people - peopleComplete;

  const pieData = [{
      name: "Complete",  // Not displayed
      value: peopleComplete,
      position: 0
    }, {
      name: "Remaining",  // Not displayed
      value: peopleRemaining,
      position: 1,
    }
  ];

  const sliceGenerator = pie().padAngle(0.005).value(d => d.value).sort((a,b) => (a.position - b.position)).startAngle(0);
  const pieSlices = sliceGenerator(pieData);

  const radius = chartSize.width / 2;
  const arcSVGData = arc().innerRadius(radius * 0.65).outerRadius(radius);

  const pieValue = (label) => {
    const shift = -Math.ceil((label.length / 2) * 25);
    return (
      <text
        key="pielabel"
        transform={`translate(${shift},15)`}
        fontSize="48px"
        fontWeight="bold"
        fill="#E38C34"
      >
        {label}
      </text>
    );
  };

  return (
    <>
      <div>
        <h1 style={{padding: "0 0 50px 0"}}>Doughnut chart example</h1>
        <svg width={canvasSize.width} height={canvasSize.height}>
          <g transform={`translate(${margin},0)`}>
            <g transform={`translate(${chartSize.height / 2}, ${chartSize.width / 2})`}>
              <g key="primarygroup">
                <path
                  key="primaryslice"
                  fill="#E38C34"
                  d={arcSVGData(pieSlices[0])}
                />
                { pieValue(pieSlices[0].data.value.toString()) }
              </g>
            </g>
            <g transform={`translate(${chartSize.height / 2}, ${chartSize.width / 2})`}>
              <g key="secondarygroup">
                <path
                  key="secondaryslice"
                  fill="#EEEE"
                  d={arcSVGData(pieSlices[1])}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div style={{width: "350px", textAlign: "center"}}>
        Your organization ranks in the second quartile of companies for Ethics
        according to our benchmark data.
      </div>
    </>
  );
};
