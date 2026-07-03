import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Search,
  Trash2,
  Video,
  Building2,
} from "lucide-react";
import API from "../services/api";

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    candidate_id: "",
    job_id: "",
    date: "",
    time: "",
    mode: "Online",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const interviewsRes = await API.get("/interviews/");
      const jobsRes = await API.get("/jobs/");
      const candidatesRes = await API.get("/candidates/");

      setInterviews(interviewsRes.data);
      setJobs(jobsRes.data);
      setCandidates(candidatesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const scheduleInterview = async () => {
    try {
      await API.post("/interviews/", {
        ...form,
        candidate_id: Number(form.candidate_id),
        job_id: Number(form.job_id),
      });

      setForm({
        candidate_id: "",
        job_id: "",
        date: "",
        time: "",
        mode: "Online",
      });

      loadData();

      toast.success("Interview Scheduled Successfully")
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInterview = async (id) => {
    if (!window.confirm("Delete Interview?")) return;

    await API.delete(`/interviews/${id}`);

    loadData();
  };

  const filtered = useMemo(() => {
    return interviews.filter((i) =>
      `${i.candidate_name} ${i.job_title}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [interviews, search]);

  return (
    <div className="space-y-6">

      {}

      <div>

        <h1 className="text-3xl font-bold">
          Interview Scheduler
        </h1>

        <p className="text-gray-500">
          Schedule and manage interviews
        </p>

      </div>

      {}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <CalendarDays className="text-blue-600 mb-3" />

          <p>Total Interviews</p>

          <h2 className="text-4xl font-bold">
            {interviews.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <Video className="text-green-600 mb-3" />

          <p>Online</p>

          <h2 className="text-4xl font-bold">
            {
              interviews.filter(
                i => i.mode === "Online"
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <Building2 className="text-purple-600 mb-3" />

          <p>Offline</p>

          <h2 className="text-4xl font-bold">
            {
              interviews.filter(
                i => i.mode === "Offline"
              ).length
            }
          </h2>

        </div>

      </div>

      {}

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <select
            className="border rounded-xl p-3"
            value={form.candidate_id}
            onChange={(e) =>
              setForm({
                ...form,
                candidate_id: e.target.value,
              })
            }
          >
            <option value="">Select Candidate</option>

            {candidates.map((candidate) => (
              <option
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-xl p-3"
            value={form.job_id}
            onChange={(e) =>
              setForm({
                ...form,
                job_id: e.target.value,
              })
            }
          >
            <option value="">Select Job</option>

            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
              >
                {job.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border rounded-xl p-3"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          <input
            type="time"
            className="border rounded-xl p-3"
            value={form.time}
            onChange={(e) =>
              setForm({
                ...form,
                time: e.target.value,
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={form.mode}
            onChange={(e) =>
              setForm({
                ...form,
                mode: e.target.value,
              })
            }
          >
            <option>Online</option>
            <option>Offline</option>
          </select>

        </div>

        <button
          onClick={scheduleInterview}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Schedule Interview
        </button>

      </div>

      {}

      <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">

        <Search size={18} />

        <input
          placeholder="Search interviews..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Candidate
              </th>

              <th className="text-left">
                Job
              </th>

              <th>Date</th>

              <th>Time</th>

              <th>Mode</th>

              <th>Status</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((interview) => (

              <tr
                key={interview.id}
                className="border-b hover:bg-blue-50"
              >

                <td className="p-4 font-semibold">
                  {interview.candidate_name}
                </td>

                <td>
                  {interview.job_title}
                </td>

                <td>
                  {interview.date}
                </td>

                <td>

                  <div className="flex items-center justify-center gap-1">

                    <Clock size={15} />

                    {interview.time}

                  </div>

                </td>

                <td>

                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    interview.mode === "Online"
                      ? "bg-blue-500"
                      : "bg-purple-500"
                  }`}>
                    {interview.mode}
                  </span>

                </td>

                <td>

                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    Scheduled
                  </span>

                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteInterview(interview.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}