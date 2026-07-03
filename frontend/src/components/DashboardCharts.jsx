import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function DashboardCharts({ stats }) {
  const doughnutData = {
    labels: [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          stats.applied,
          stats.shortlisted,
          stats.interviewing,
          stats.selected,
          stats.rejected,
        ],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#A855F7",
          "#14B8A6",
          "#EF4444",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Jobs",
      "Candidates",
      "Interviews",
    ],
    datasets: [
      {
        label: "Overview",
        data: [
          stats.jobs,
          stats.candidates,
          stats.interviews,
        ],
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          Candidate Status
        </h2>

        <Doughnut data={doughnutData} />

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          Recruitment Overview
        </h2>

        <Bar data={barData} />

      </div>

    </div>
  );
}