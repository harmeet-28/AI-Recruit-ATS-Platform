import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow px-4 py-3">

      <Search className="text-gray-400" size={18} />

      <input
        className="ml-3 w-full outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>
  );
}