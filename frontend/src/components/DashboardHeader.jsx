import { CalendarDays, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const admin = localStorage.getItem("admin") || "Admin";

  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

        <div>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={22} />
            <span className="font-medium">AI Recruit ATS</span>
          </div>

          <h1 className="text-4xl font-bold">
            Welcome back, {admin} 👋
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Manage hiring, screen candidates and track interviews from one dashboard.
          </p>

        </div>

        <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4">

          <div className="flex items-center gap-2">

            <CalendarDays size={20} />

            <span>{today}</span>

          </div>

        </div>

      </div>

    </div>
  );
}