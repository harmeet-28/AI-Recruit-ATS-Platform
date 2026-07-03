import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title,
  subtitle,
}) {
  return (
    <div className="text-center py-16">

      <FolderOpen
        size={60}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-2xl font-bold mt-4">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}