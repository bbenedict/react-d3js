import React, { useRef, useEffect } from "react";
import { select, pie, arc } from "d3";

// Single value doughnut chart
export default function DoughnutChart() {
  const chartRef = useRef();

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

  useEffect(() => {
    const chartSVG = select(chartRef.current);

    const chart = chartSVG.append("g")
      .style("transform",`translate(${margin},${margin})`);

    const sliceGenerator = pie().padAngle(0.005).value(d => d.value).sort((a,b) => (a.position - b.position)).startAngle(0);
    const pieSlices = sliceGenerator(pieData);
  
    const radius = chartSize.width / 2;
    const arcSVGData = arc().innerRadius(radius * 0.65).outerRadius(radius);

    const primaryGroup = chart.append("g").attr("transform",`translate(${chartSize.height / 2}, ${chartSize.width / 2})`);
    primaryGroup.append("path")
      .attr("fill","#E38C34")
      .attr("d",arcSVGData(pieSlices[0]));
    primaryGroup.append("text")
      .text(pieSlices[0].data.value.toString())
      .attr("fill","black")
      .attr("font-size","48px")
      .attr("font-weight","bold")
      .attr("transform",`translate(${-Math.ceil((pieSlices[0].data.value.toString().length / 2) * 25)},15)`);

    const secondaryGroup = chart.append("g").attr("transform",`translate(${chartSize.height / 2}, ${chartSize.width / 2})`);
    secondaryGroup.append("path").attr("fill","lightgray").attr("d",arcSVGData(pieSlices[1]));
  }, []);

  return (
    <>
      <div>
        <h1 style={{padding: "0 0 50px 0"}}>Doughnut chart example</h1>
        <svg ref={chartRef} width={canvasSize.width} height={canvasSize.height} />
      </div>
      <div style={{width: "350px", textAlign: "center"}}>
        Your group is 45% complete with the task.
      </div>
    </>
  );
};
