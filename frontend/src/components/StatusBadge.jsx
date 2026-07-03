export default function StatusBadge({ status }) {
  const styles = {
    Applied: "bg-blue-100 text-blue-700",
    Shortlisted: "bg-green-100 text-green-700",
    Interview: "bg-purple-100 text-purple-700",
    Selected: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}