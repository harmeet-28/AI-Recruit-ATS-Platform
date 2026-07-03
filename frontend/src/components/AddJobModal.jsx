import { useState } from "react";

export default function AddJobModal({ isOpen, onClose, onAddJob }) {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills: "",
  });
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddJob({
      id: Date.now(),
      ...job,
    });

    setJob({
      title: "",
      company: "",
      location: "",
      skills: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[450px]">
        <h2 className="text-2xl font-bold mb-5">Add Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border rounded-lg p-3"
            placeholder="Job Title"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Company"
            value={job.company}
            onChange={(e) => setJob({ ...job, company: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Location"
            value={job.location}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Required Skills"
            value={job.skills}
            onChange={(e) => setJob({ ...job, skills: e.target.value })}
          />

          <textarea
            className="w-full border rounded-lg p-3"
            placeholder="Job Description"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300"
            >
              Cancel
            </button>

            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
