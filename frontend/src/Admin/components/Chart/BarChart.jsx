/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Sample data for the bar chart

const MyBarChart = ({ data }) => {
  const chartRef = useRef();

  // Function to download the chart as a PDF
  const downloadPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100); // Adjust the width and height as needed
      pdf.save("bar-chart.pdf");
    });
  };

  return (
    <div>
      <div ref={chartRef} style={{ width: "100%", height: 600 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="horizontal" // Set the layout to "vertical" for horizontal bars
            data={data}
            barSize={60}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percent" fill="#8884d8" />
          </BarChart>
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

export default MyBarChart;
