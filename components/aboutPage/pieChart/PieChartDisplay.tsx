import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataItem {
  value: number;
}

interface PieChartProps {
  data: DataItem[];
}
const customColors: string[] = [
  "#054a91",
  "#548bc3",
  "#3c7bbc",
  "#678eb6",
  "#83aad2",
];

const PieChartDisplay: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 250, height: 250 });

  const createPieChart = () => {
    if (data && data.length > 0 && chartRef.current) {
      const { width, height } = dimensions;
      const radius = Math.min(width, height) / 2;

      // Create a custom color scale using the provided color codes
      const color: d3.ScaleOrdinal<string, string> = d3
        .scaleOrdinal<string>()
        .range(customColors);

      d3.select(chartRef.current).selectAll("svg").remove();

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie<DataItem>().value((d) => d.value);
      const arc = d3
        .arc<d3.PieArcDatum<DataItem>>()
        .innerRadius(0)
        .outerRadius(radius);
      const arcs = pie(data);

      svg
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i.toString()));

      svg
        .selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d) => `${d.data.value.toString()}%`)
        .style("font-size", `${Math.min(width, height) * 0.05}px`)
        .style("fill", "white");
    }
  };

  useEffect(() => {
    const resizeChart = () => {
      if (chartRef.current) {
        const width = chartRef.current?.clientWidth || 250; 
        const height = chartRef.current?.clientWidth || 250; 
    
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", resizeChart);
    resizeChart();

    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  useEffect(() => {
    createPieChart();
  }, [dimensions, data]);

  return <div ref={chartRef} ></div>;
};

export default PieChartDisplay;
