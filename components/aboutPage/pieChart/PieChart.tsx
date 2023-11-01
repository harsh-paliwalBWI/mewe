// import React, { useEffect, useRef,FC } from 'react';
// import * as d3 from "d3";

// interface Props {
//     data:any // Adjust the type as needed
//     width: any
//     height:any
//   }

// const PieChart:FC<Props> = (props) => {
//   const chartRef = useRef("");

//   const [data]=[{property:"a",value:4},
//   {property:"b",value:3},
//   {property:"c",value:10},
//   {property:"d",value:2},
//   {property:"e",value:8}]

//   const svgRef=useRef<String>("")

//   return (
//     <div>
//         <svg ref={svgRef}></svg>
//     </div>
//   )
// };

// export default PieChart;

// Import required libraries

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// interface DataItem {
//   value: number;
// }

// interface PieChartProps {
//   data: DataItem[];
// }

// const PieChart: React.FC<PieChartProps> = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const width = 300; // Set the width of the SVG container
//       const height = 300; // Set the height of the SVG container
//       const radius = Math.min(width, height) / 2; // Calculate the radius based on container dimensions
//       const color = d3.scaleOrdinal(d3.schemeCategory10);
      
//       const svg = d3
//         .select(chartRef.current)
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`); // Center the pie chart within the SVG container

//       const pie = d3.pie<DataItem>().value((d) => d.value);
//       const arc = d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(0).outerRadius(radius);
//       const arcs = pie(data);

//       svg
//         .selectAll("path")
//         .data(arcs)
//         .enter()
//         .append("path")
//         .attr("d", arc)
//         .attr("fill", (d, i) => color(i.toString()));
//     }
//   }, [data]);

//    return <div ref={chartRef}></div>;
// };

// export default PieChart;
