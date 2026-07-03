import {
  Bell,
  Search,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/jobs": "Job Management",
    "/candidates": "Candidate Management",
    "/ai-screening": "AI Resume Screening",
    "/pipeline": "Hiring Pipeline",
    "/interviews": "Interview Scheduler",
  };

  const currentPage =
    pageTitles[location.pathname] || "Dashboard";

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shadow-sm">

      {}

      <div>

        <p className="text-gray-500 text-sm">

          {greeting} 👋

        </p>

        <h1 className="text-3xl font-bold mt-1">

          {currentPage}

        </h1>

      </div>

      {}

      <div className="flex items-center gap-6">

        {}

        <div className="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-72">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full"
          />

        </div>

        {}

        <div className="hidden md:flex items-center gap-2 text-gray-600">

          <CalendarDays size={18} />

          <span className="text-sm">

            {today}

          </span>

        </div>

        {}

        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

          <Bell size={22} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {}

        <button className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition">

          <img
            src="https://ui-avatars.com/api/?name=Harmeet+Singh&background=2563EB&color=fff"
            alt="Profile"
            className="w-11 h-11 rounded-full"
          />

          <div className="hidden md:block text-left">

            <h3 className="font-semibold">

              Harmeet Singh

            </h3>

            <p className="text-sm text-gray-500">

              HR Administrator

            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-gray-500"
          />

        </button>

      </div>

    </header>
  );
}