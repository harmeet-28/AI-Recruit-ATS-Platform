import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function AIScreening() {
  const [candidates, setCandidates] = useState([]);
  const [candidateId, setCandidateId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidates/");
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const analyzeResume = async () => {
    if (!candidateId) {
      toast.error("Select Candidate");
      return;
    }

    if (!file) {
      toast.error("Select Resume PDF");
      return;
    }

    const formData = new FormData();

    formData.append("candidate_id", candidateId);
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);

      toast.success("Resume Analyzed Successfully");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Analysis Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <div className="bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">
          🤖 AI Resume Screening
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <select
            className="border rounded-xl p-3"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
          >
            <option value="">
              Select Candidate
            </option>

            {candidates.map((candidate) => (
              <option
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-xl p-3"
          />

        </div>

        <button
          onClick={analyzeResume}
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </div>

      {result && (

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Result
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p>
                <strong>Candidate:</strong>{" "}
                {result.candidate}
              </p>

              <p>
                <strong>Job:</strong>{" "}
                {result.job}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {result.status}
              </p>

              <p>
                <strong>Recommendation:</strong>{" "}
                {result.recommendation}
              </p>

            </div>

            <div>

              <h3 className="font-bold mb-2">
                AI Match Score
              </h3>

              <div className="w-full bg-gray-200 rounded-full h-8">

                <div
                  className="bg-green-600 text-white text-center rounded-full h-8 leading-8"
                  style={{
                    width: `${result.score}%`,
                  }}
                >
                  {result.score}%
                </div>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div>

              <h3 className="font-bold mb-3">
                ✅ Matched Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {result.matched_skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            <div>

              <h3 className="font-bold mb-3">
                ❌ Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {result.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}