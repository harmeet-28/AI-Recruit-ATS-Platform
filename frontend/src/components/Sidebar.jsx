import {
  LayoutDashboard,
  Briefcase,
  Users,
  Bot,
  GitBranch,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    path: "/candidates",
    icon: Users,
  },
  {
    title: "AI Screening",
    path: "/ai-screening",
    icon: Bot,
  },
  {
    title: "Pipeline",
    path: "/pipeline",
    icon: GitBranch,
  },
  {
    title: "Interviews",
    path: "/interviews",
    icon: CalendarDays,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl shadow-lg">
            🤖
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              AI Recruit
            </h1>

            <p className="text-slate-400 text-sm">
              ATS Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-5">
        <p className="uppercase text-xs text-slate-400 tracking-widest mb-4">
          Main Menu
        </p>

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-700 hover:translate-x-1"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-5">

        <button
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-700 transition"
        >
          <Settings size={20} />
          Settings
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 transition mt-2"
        >
          <LogOut size={20} />
          Logout
        </button>

        <div className="mt-8 text-center">
          <span className="bg-blue-600 px-4 py-1 rounded-full text-sm">
            Version 2.0
          </span>
        </div>

      </div>
    </aside>
  );
}