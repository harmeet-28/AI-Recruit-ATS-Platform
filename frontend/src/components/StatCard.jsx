import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            {subtitle}
          </p>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${color}`}
        >
          <Icon size={28} />
        </div>

      </div>

      <div className="flex items-center gap-2 mt-6 text-green-600 font-semibold">

        <ArrowUpRight size={18} />

        +12% from last month

      </div>

    </div>
  );
}