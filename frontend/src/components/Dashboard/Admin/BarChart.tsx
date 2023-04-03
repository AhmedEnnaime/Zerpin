import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import API from "../../../utils/API";
import { Bar } from "react-chartjs-2";
import IContract from "../../../Interfaces/Contract";

Chart.register(CategoryScale);
const BarChart = () => {
  const [contracts, setContracts] = useState<IContract[]>();
  const [chartData, setChartData] = useState({
    labels: [] as string[],
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
        data: [] as number[],
      },
    ],
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getMonthName(month: string): string {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "";
    }
  }

  function calculateChartData(contracts: IContract[]) {
    const contractsByMonth: { [key: string]: number } = contracts.reduce(
      (acc, contract) => {
        const month = getMonthName(
          contract.debut_date.split("T")[0].split("-")[1]
        );
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

    const contractCounts = monthNames.map(
      (month) => contractsByMonth[month] || 0
    );

    setChartData({
      labels: monthNames,
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
          data: contractCounts,
        },
      ],
    });
  }

  useEffect(() => {
    async function getEmployees() {
      try {
        const res = await API.get(`contracts`);
        setContracts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (contracts) {
      calculateChartData(contracts);
    } else {
      getEmployees();
    }
  }, [contracts]);
  return (
    <Bar
      className="w-full p-2"
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Months with the most hired employees",
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default BarChart;
