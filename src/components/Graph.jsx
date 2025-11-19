import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Graph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Clear previous graph before drawing a new one
    svg.selectAll("*").remove();

    const width = 800;
    const height = 300;

    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, 1])
      .range([height, height * (1 - 0.4)]);

    // Converts amplitude points into an SVG path.
    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d.amplitude));

    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("stroke", "#ff9900")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }, [data]);

  return (
    <svg
      width={800}
      height={300}
      ref={svgRef}
      className="m-2"
      style={{ border: "1px solid #444" }}
    />
  );
};

export default Graph;
