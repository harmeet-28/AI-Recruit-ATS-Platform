import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const login = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Enter Email & Password");
    return;
  }

  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("Login Response:", res.data);

    localStorage.setItem("token", "AIRecruitATS");
    localStorage.setItem("admin", res.data.username);

    toast.success("Login Successful");

    navigate("/dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    console.error("Response:", err.response);

    toast.error(err.response?.data?.detail || "Login Failed");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-6">
      <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl">
        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-5xl mb-8">
            🤖
          </div>

          <h1 className="text-5xl font-bold leading-tight">AI Recruit ATS</h1>

          <p className="mt-6 text-slate-300 text-lg leading-8">
            Smart AI-powered recruitment platform for modern HR teams.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />
              AI Resume Screening
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />
              Candidate Ranking
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />
              Interview Scheduler
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-400" />
              Hiring Pipeline
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>

          <p className="text-gray-500 mt-2 mb-8">Login to continue</p>

          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="font-medium">Email</label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Mail className="text-gray-400" />

                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full p-4 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Password</label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Lock className="text-gray-400" />

                <input
                  type="password"
                  placeholder="********"
                  className="w-full p-4 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3 text-lg">
              Login
              <ArrowRight />
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            AI Recruit ATS Platform v2.0
          </p>
        </div>
      </div>
    </div>
  );
}
