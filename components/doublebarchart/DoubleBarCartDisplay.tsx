// Import required libraries
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define prop types to avoid TypeScript errors
type DoubleBarChartProps = {
  data: { label: string; value1: number; value2: number }[];
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
};

// Function to create double bar chart
const DoubleBarChart: React.FC<DoubleBarChartProps> = ({
  data,
  width,
  height,
  margin,
}) => {
  // Use ref to create chart container
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Use useEffect to update chart on data change
  useEffect(() => {
    // Select the chart container using ref
    const svg = d3.select(svgRef.current);

    // Clear previous chart content
    svg.selectAll("*").remove();

    // Increase margins for all sides
    const updatedMargin = {
      top: margin.top + 40, // Shifted down by 50 units
      right: margin.right + 40, // Shifted right by 60 units
      bottom: margin.bottom + 30, // Shifted down by 50 units
      left: margin.left + 50, // Shifted right by 60 units
    };

    // Calculate chart dimensions considering updated margins
    const innerWidth = width - updatedMargin.left - updatedMargin.right;
    const innerHeight = height - updatedMargin.top - updatedMargin.bottom;

    const chartContainer = svg.append('g')
      .attr('transform', `translate(${updatedMargin.left},${updatedMargin.top})`); // Shift the chart container based on updated margins

    // Create x and y scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.35);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        Math.ceil(
          (d3.max(data, (d) => Math.max(d.value1, d.value2)) as number) / 20
        ) * 20,
      ])
      .nice()
      .range([innerHeight, 0]);

    // Create bars for the first data set
    chartContainer.selectAll(".bar1") // Select within chartContainer instead of svg
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", (d) => xScale(d.label) as number)
      .attr("y", (d) => yScale(d.value1) as number)
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => (innerHeight - yScale(d.value1)) as number)
      .attr("fill", "#054a91");

    // Create bars for the second data set
    chartContainer.selectAll(".bar2") // Select within chartContainer instead of svg
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (d) => (xScale(d.label) as number) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value2) as number)
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => (innerHeight - yScale(d.value2)) as number)
      .attr("fill", "#83aad2");

    // Create x-axis
    chartContainer.append("g") // Select within chartContainer instead of svg
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style("font-weight", "bold") // Make the text bold
    //   .style("stroke", "#054a91");

    chartContainer.append("text")
  .attr("x", innerWidth / 2) // Position the label at the center of the x-axis
  .attr("y", innerHeight + margin.bottom +15) // Adjust the y position for the label
  .attr("text-anchor", "middle")
  .attr("fill", "#054a91") // Set the label color to #054a91
  .text("Month Wise") // The text you want to display as the label
  .style("font-weight", "bold") // Make the text bold
      

    chartContainer.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale).tickValues(d3.range(0, Math.ceil((d3.max(data, d => Math.max(d.value1, d.value2)) as number) / 20) * 20 + 1, 20)))
      .style("font-weight", "bold") // Make the text bold
    //   .style("fill", "#054a91");

    chartContainer.append("text")
  .attr("transform", "rotate(-90)") // Rotate the text by -90 degrees
  .attr("y", -35 - margin.left) // Adjust the y position for the label
  .attr("x", 0 - (innerHeight / 2)) // Position the label at the center of the y-axis
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .style("fill", "#054a91") // Set the label color to #054a91
  .style("font-weight", "bold") // Make the text bold
  .text("Rupees (in thousands)"); // The text you want to display as the label

    // // Add labels to x-axis
    // chartContainer.selectAll(".x-axis text") // Select within chartContainer instead of svg
    //   .attr("class", "axis-label")
    //   .style("text-anchor", "middle")
   

    // // Add labels to y-axis
    // chartContainer.selectAll(".y-axis text") // Select within chartContainer instead of svg
    //   .attr("class", "axis-label")
    //   .style("text-anchor", "middle");


    

      
  }, [data, width, height, margin]);

  // Return the chart container
  return (
    <svg ref={svgRef} width={width} height={height} className="bg-[#eff3f7] ">
      <g transform={`translate(${margin.left},${margin.top})`}></g>
    </svg>
  );
};

export default DoubleBarChart;
