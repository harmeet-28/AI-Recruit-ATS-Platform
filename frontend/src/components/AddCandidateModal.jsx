import { useState } from "react";

export default function AddCandidateModal({
  isOpen,
  onClose,
  onAddCandidate,
}) {
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddCandidate({
      id: Date.now(),
      ...candidate,
      status: "Applied",
      score: Math.floor(Math.random() * 25) + 75,
    });

    setCandidate({
      name: "",
      email: "",
      phone: "",
      skills: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Add Candidate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="border w-full p-3 rounded-lg"
            placeholder="Name"
            value={candidate.name}
            onChange={(e) =>
              setCandidate({ ...candidate, name: e.target.value })
            }
          />

          <input
            className="border w-full p-3 rounded-lg"
            placeholder="Email"
            value={candidate.email}
            onChange={(e) =>
              setCandidate({ ...candidate, email: e.target.value })
            }
          />

          <input
            className="border w-full p-3 rounded-lg"
            placeholder="Phone"
            value={candidate.phone}
            onChange={(e) =>
              setCandidate({ ...candidate, phone: e.target.value })
            }
          />

          <input
            className="border w-full p-3 rounded-lg"
            placeholder="Skills"
            value={candidate.skills}
            onChange={(e) =>
              setCandidate({ ...candidate, skills: e.target.value })
            }
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}