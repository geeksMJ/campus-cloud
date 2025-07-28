/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#FFD700",
];

const MyPieChart = ({ data }) => {
  const chartRef = useRef();

  // Function to download the chart as a PDF
  const downloadPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100); // Adjust the width and height as needed
      pdf.save("pie-chart.pdf");
    });
  };

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: 600 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percent"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </ResponsiveContainer>

      </div>
      <button
        onClick={downloadPDF}
        className="w-full bg-blue-600 font-bold text-white py-2 rounded mt-2"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default MyPieChart;
