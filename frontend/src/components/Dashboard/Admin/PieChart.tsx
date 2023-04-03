import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import IDepartment from "../../../Interfaces/Department";
import API from "../../../utils/API";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

const PieChart = () => {
  const [departments, setDepartments] = useState<IDepartment[]>();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8e5ea2",
          "#3cba9f",
        ],
        borderColor: "#fff",
        data: [],
      },
    ],
  });

  const getDepartments = async () => {
    try {
      const res = await API.get(`departments`);
      setDepartments(res.data);
      setChartData({
        labels: res.data.map((department: IDepartment) => department.name),
        datasets: [
          {
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#8e5ea2",
              "#3cba9f",
            ],
            borderColor: "#fff",
            data: res.data.map(
              (department: IDepartment) => department.users?.length
            ),
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <Pie
      className="w-full h-full p-2"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Most dominant departments",
          },
        },
      }}
    />
  );
};

export default PieChart;
