import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Briefcase,
  Building2,
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";

import API from "../services/api";
import AddJobModal from "../components/AddJobModal";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addJob = async (job) => {
    try {
      await API.post("/jobs/", job);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      `${job.title} ${job.company} ${job.location} ${job.skills}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [jobs, search]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Job Management
          </h1>

          <p className="text-gray-500">
            Manage all available job openings
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
        >
          <Plus size={18} />
          Add Job
        </button>

      </div>

      {/* Top Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <Briefcase className="text-blue-600 mb-3" />

          <p className="text-gray-500">
            Total Jobs
          </p>

          <h2 className="text-4xl font-bold">
            {jobs.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <Building2 className="text-green-600 mb-3" />

          <p className="text-gray-500">
            Companies
          </p>

          <h2 className="text-4xl font-bold">
            {
              new Set(jobs.map((j) => j.company)).size
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <MapPin className="text-purple-600 mb-3" />

          <p className="text-gray-500">
            Locations
          </p>

          <h2 className="text-4xl font-bold">
            {
              new Set(jobs.map((j) => j.location)).size
            }
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">

        <Search className="text-gray-400" />

        <input
          placeholder="Search jobs..."
          className="w-full outline-none"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Jobs Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Job</th>
              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Skills</th>
              <th className="text-center p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredJobs.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-500"
                >
                  No Jobs Found
                </td>

              </tr>

            ) : (

              filteredJobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-b hover:bg-blue-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {job.title}
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {job.company}
                    </span>

                  </td>

                  <td className="p-4">
                    📍 {job.location}
                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      {job.skills
                        .split(",")
                        .map((skill, index) => (

                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                          >
                            {skill.trim()}
                          </span>

                        ))}

                    </div>

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <AddJobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddJob={addJob}
      />

    </div>
  );
}