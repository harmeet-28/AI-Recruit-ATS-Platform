import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Trophy,
} from "lucide-react";
import API from "../services/api";

export default function Pipeline() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const res = await API.get("/candidates/");
    setCandidates(res.data);
  };

  const columns = [
    {
      title: "Applied",
      color: "bg-blue-500",
    },
    {
      title: "Shortlisted",
      color: "bg-green-500",
    },
    {
      title: "Interview",
      color: "bg-purple-500",
    },
    {
      title: "Selected",
      color: "bg-emerald-600",
    },
    {
      title: "Rejected",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Hiring Pipeline
        </h1>

        <p className="text-gray-500">
          Track candidates through every recruitment stage.
        </p>

      </div>

      <div className="grid grid-cols-5 gap-5">

        {columns.map((column) => (

          <div
            key={column.title}
            className="bg-gray-100 rounded-2xl p-4"
          >

            <div
              className={`${column.color} text-white rounded-xl p-3 text-center font-bold mb-4`}
            >
              {column.title}
            </div>

            {candidates
              .filter(
                (c) => c.status === column.title
              )
              .map((candidate) => (

                <div
                  key={candidate.id}
                  className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-xl transition"
                >

                  <div className="flex justify-between">

                    <h3 className="font-bold">
                      {candidate.name}
                    </h3>

                    <Trophy
                      className="text-yellow-500"
                      size={18}
                    />

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">

                    <Mail size={14}/>

                    <span className="text-sm">
                      {candidate.email}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 mt-1 text-gray-600">

                    <Phone size={14}/>

                    <span className="text-sm">
                      {candidate.phone}
                    </span>

                  </div>

                  <div className="mt-4">

                    <div className="flex justify-between text-sm">

                      <span>AI Score</span>

                      <span>
                        {candidate.match_score}%
                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{
                          width: `${candidate.match_score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              ))}

          </div>

        ))}

      </div>

    </div>
  );
}