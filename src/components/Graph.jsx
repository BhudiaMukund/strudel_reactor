import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Graph({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.time), d3.max(data, (d) => d.time)])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.freq)])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.freq));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
