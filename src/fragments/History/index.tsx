import {} from "@mui/material";
import { useState } from "react";
import "./index.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  lineTension: 0.5,
  scales: {
    y: {
      grid: {
        tickLength: 20,
        tickColor: "#fff",
        drawBorder: false
      },
      min: 0,
      ticks: {
        // forces step size to be 50 units
        stepSize: 100
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
      text: "Chart.js Line Chart"
    }
  }
};

const timeframes = ["Daily", "Weekly", "Monthly"] as const;

export function TaskHistory() {
  const [timeframe, setTimeframe] =
    useState<typeof timeframes[number]>("Daily");

  const generate_labels = (): string[] => {
    switch (timeframe) {
      case "Daily":
        const hours = [];
        for (let i = 0; i < 12; i++) {
          hours.unshift(
            moment().startOf("hour").subtract(i, "hour").format("hh:mm")
          );
        }

        return hours;
      case "Weekly":
        const weeks = [];
        for (let i = 0; i < 12; i++) {
          weeks.unshift(moment().subtract(i, "week").format("DD MMM"));
        }
        return weeks;

      default:
        const months = [];
        for (let i = 0; i < 12; i++) {
          months.unshift(moment().subtract(i, "month").format("MMM"));
        }

        return months;
    }
  };

  const labels = generate_labels();
  console.log(labels);

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: labels.map(() => faker.datatype.number({ min: 10, max: 400 })),
        borderColor: "#4BA8A8",
        backgroundColor: "#4BA8A8",
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBorderWidth: 3,
        pointBorderColor: "#fff"
      },
      {
        label: "Pending Tasks",
        data: labels.map(() => faker.datatype.number({ min: 10, max: 400 })),
        borderColor: "#F8B400",
        backgroundColor: "#F8B400",
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBorderWidth: 3,
        pointBorderColor: "#fff"
      }
    ]
  };

  return (
    <article className="history-section card">
      <div className="section-header">
        <h3 className="section-title">Task Done</h3>
        <ul className="timeframes">
          {timeframes.map(tf => {
            return (
              <li
                key={tf}
                role="button"
                className={timeframe === tf ? "timeframe active" : "timeframe"}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ minHeight: "60px" }}></div>
      <Line options={options} data={data} />
    </article>
  );
}
