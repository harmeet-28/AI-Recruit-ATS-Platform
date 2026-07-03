import { useEffect, useMemo, useState } from "react";
import { Search, Users, UserCheck, Mail, Phone, Trash2 } from "lucide-react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    job_id: "",
    resume: "",
    extracted_skills: "",
    match_score: 0,
    status: "Applied",
  });

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    const res = await API.get("/candidates/");
    setCandidates(res.data);
  };

  const fetchJobs = async () => {
    const res = await API.get("/jobs/");
    setJobs(res.data);
  };

  const addCandidate = async () => {
    try {
      await API.post("/candidates/", {
        ...form,
        job_id: Number(form.job_id),
      });

      fetchCandidates();

      setForm({
        name: "",
        email: "",
        phone: "",
        job_id: "",
        resume: "",
        extracted_skills: "",
        match_score: 0,
        status: "Applied",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCandidate = async (id) => {
    if (!window.confirm("Delete Candidate?")) return;

    await API.delete(`/candidates/${id}`);
    fetchCandidates();
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) =>
      `${candidate.name} ${candidate.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [candidates, search]);

  return (
    <div className="space-y-6">
      {}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Candidate Management</h1>

          <p className="text-gray-500">Manage all applicants</p>
        </div>
      </div>

      {}

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white shadow rounded-2xl p-6">
          <Users className="text-blue-600 mb-3" />

          <p>Total Candidates</p>

          <h2 className="text-4xl font-bold">{candidates.length}</h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <UserCheck className="text-green-600 mb-3" />

          <p>Shortlisted</p>

          <h2 className="text-4xl font-bold">
            {candidates.filter((c) => c.status === "Shortlisted").length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <Mail className="text-purple-600 mb-3" />

          <p>Rejected</p>

          <h2 className="text-4xl font-bold">
            {candidates.filter((c) => c.status === "Rejected").length}
          </h2>
        </div>
      </div>

      {}

      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
        <Search className="text-gray-500" />

        <input
          placeholder="Search candidate..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {}

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border rounded-xl p-3"
            placeholder="Candidate Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <select
            className="border rounded-xl p-3"
            value={form.job_id}
            onChange={(e) => setForm({ ...form, job_id: e.target.value })}
          >
            <option value="">Select Job</option>

            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addCandidate}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Add Candidate
        </button>
      </div>

      {}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Candidate</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Score</th>

              <th>Status</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="border-b hover:bg-blue-50">
                <td className="p-4 font-semibold">{candidate.name}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {candidate.email}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {candidate.phone}
                  </div>
                </td>

                <td>
                  <div className="w-28 bg-gray-200 rounded-full">
                    <div
                      className="bg-green-500 text-white text-xs rounded-full text-center"
                      style={{
                        width: `${candidate.match_score}%`,
                      }}
                    >
                      {candidate.match_score}%
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      candidate.status === "Shortlisted"
                        ? "bg-green-500"
                        : candidate.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-blue-500"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>

                <td>
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/candidate/${candidate.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteCandidate(candidate.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
