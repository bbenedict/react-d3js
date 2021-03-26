import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import data from './data/my_weather_data.json';

// The labels on both axis are still not in the right place
export default function BarChart() {
  const chartRef = useRef();
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

  const numberOfThresholds = 6;
  const barPadding = 2;

  useEffect(() => {
    const xData = (d) => d.humidity;
    const yData = (d) => d.length;

    const chartSVG = d3.select(chartRef.current);

    const chart = chartSVG.append("g")
      .style("transform",`translate(${margin},${margin})`);

    chart.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", chartSize.width)
      .attr("height", chartSize.height)
      .attr("fill", "lightgray");

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xData))
      .range([0, chartSize.width])
      .nice(numberOfThresholds);

    const barsGenerator = d3.bin()
      .domain(xScale.domain())
      .value(xData)
      .thresholds((data, min, max) => d3.range(numberOfThresholds).map(t => min + (t / numberOfThresholds) * (max - min)));
      //.thresholds(numberOfThresholds);  // This allows d3 to use best guess near the numberOfThresholds

    const bars = barsGenerator(data);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bars, yData)])
      .range([chartSize.height, 0])
      .nice();

    const barsGroup = chart.append("g");

    barsGroup.selectAll("g")
      .data(bars)
      .enter().append("rect")
      .attr("x", d => xScale(d.x0) + barPadding)
      .attr("y", d => yScale(yData(d)))
      .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
      .attr("height", d => chartSize.height - yScale(yData(d)))
      .attr("fill", "cornflowerblue");
  }, []);

  return (
    <div>
      <h1>Bar chart example</h1>
      <svg ref={chartRef} width={canvasSize.width} height={canvasSize.height} />
    </div>
  );
};
