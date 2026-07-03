import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function CandidateProfile() {

  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {

    const res = await API.get(`/candidates/${id}`);

    setCandidate(res.data);

  };

  if (!candidate)
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );

  return (

    <div className="space-y-8">

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex gap-6 items-center">

          <img
            src={`https://ui-avatars.com/api/?name=${candidate.name}`}
            className="w-28 h-28 rounded-full"
          />

          <div>

            <h1 className="text-3xl font-bold">

              {candidate.name}

            </h1>

            <p className="text-gray-500">

              {candidate.email}

            </p>

            <p>

              {candidate.phone}

            </p>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="font-bold text-xl mb-5">

            AI Match

          </h2>

          <div className="w-full bg-gray-200 rounded-full h-6">

            <div
              className="bg-green-500 h-6 rounded-full text-center text-white"
              style={{
                width: `${candidate.match_score}%`,
              }}
            >

              {candidate.match_score}%

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="font-bold text-xl mb-5">

            Status

          </h2>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

            {candidate.status}

          </span>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="font-bold text-xl mb-4">

          Extracted Skills

        </h2>

        <div className="flex flex-wrap gap-3">

          {(candidate.extracted_skills || "")
            .split(",")

            .filter(Boolean)

            .map((skill) => (

              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >

                {skill.trim()}

              </span>

            ))}

        </div>

      </div>

    </div>

  );

}