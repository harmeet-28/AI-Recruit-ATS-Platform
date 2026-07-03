import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import DashboardCharts from "../components/DashboardCharts";
import DashboardHeader from "../components/DashboardHeader";


import {
  Briefcase,
  Users,
  UserCheck,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const cards = [
    {
      title: "Jobs",
      value: stats.jobs,
      icon: Briefcase,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Candidates",
      value: stats.candidates,
      icon: Users,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: UserCheck,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: CalendarDays,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const chartData = {
    labels: ["Applied", "Shortlisted", "Rejected"],
    datasets: [
      {
        data: [
          stats.applied,
          stats.shortlisted,
          stats.rejected,
        ],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#EF4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8">

      {}
      <DashboardHeader />


      <div>

        <h1 className="text-3xl font-bold">
          AI Recruitment Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back! Here's today's recruitment overview.
        </p>

      </div>

      {}

      <div className="grid md:grid-cols-4 gap-6">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${card.color} text-white rounded-3xl shadow-lg p-6`}
            >
              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm opacity-90">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {card.value}
                  </h2>

                </div>

                <div className="bg-white/20 p-3 rounded-2xl">
                  <Icon size={28} />
                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

      {}

      <div className="grid lg:grid-cols-3 gap-6">

        {}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >

          <h2 className="text-xl font-bold mb-6">
            Candidate Status
          </h2>

          <div className="w-64 mx-auto">
            <Doughnut data={chartData} />
          </div>

        </motion.div>

        {}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6"
        >

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold">
              Recent Candidates
            </h2>

            <TrendingUp className="text-green-500" />

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Candidate
                </th>

                <th className="text-center">
                  AI Score
                </th>

                <th className="text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.recent.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-500"
                  >
                    No Candidates Yet
                  </td>

                </tr>

              ) : (

                stats.recent.map((candidate) => (

                  <tr
                    key={candidate.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 font-semibold">
                      {candidate.name}
                    </td>

                    <td className="text-center">

                      <div className="flex items-center justify-center gap-3">

                        <div className="w-24 bg-gray-200 rounded-full h-3">

                          <div
                            className="bg-green-500 h-3 rounded-full"
                            style={{
                              width: `${candidate.match_score}%`,
                            }}
                          />

                        </div>

                        <span>
                          {candidate.match_score}%
                        </span>

                      </div>

                    </td>

                    <td className="text-center">

                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          candidate.status === "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : candidate.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {candidate.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </motion.div>

      </div>

      {}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-lg p-6"
      >

        <h2 className="text-xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            Resume uploaded successfully
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            AI screening completed
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            Interview scheduled
          </div>

        </div>

      </motion.div>

    </div>
  );
}