import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, FileText, LogOut, Mail, Shield, User } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import Button from "../../shared/components/Button";
import Navbar from "../../shared/landing/Navbar";

const ROLE_LABELS = {
  student: "Student",
  tutor: "Tutor",
  recruiter: "Recruiter",
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] p-3 sm:p-5 pt-20 sm:pt-28 text-slate-100">
      <Navbar />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:gap-5 py-6 sm:py-8 px-0 sm:px-2">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-blue-300">Dashboard</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold break-words">
              Welcome, {user?.name || "Learner"}
            </h1>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={handleLogout}
            leftIcon={<LogOut size={16} />}
            className="border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800 w-full sm:w-auto mt-3 sm:mt-0"
          >
            Logout
          </Button>
        </div>

        <section className="grid gap-3 sm:gap-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 sm:p-5 shadow-xl backdrop-blur">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
              <User size={20} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Name</p>
            <p className="mt-1 font-semibold text-sm sm:text-base break-words">{user?.name || "Not available"}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 sm:p-5 shadow-xl backdrop-blur">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
              <Mail size={20} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Email</p>
            <p className="mt-1 break-words font-semibold text-sm sm:text-base">
              {user?.email || "Not available"}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 sm:p-5 shadow-xl backdrop-blur sm:col-span-2 md:col-span-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
              <Shield size={20} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Role</p>
            <p className="mt-1 font-semibold text-sm sm:text-base">
              {ROLE_LABELS[user?.role] || user?.role || "Not available"}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-slate-900/70 p-4 sm:p-5 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-300">
                <BadgeCheck size={15} />
                Authenticated
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-0">Continue your workflow</h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Pick up your career readiness work from here.
              </p>
            </div>

            <Link
              to="/resume-analyzer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-blue-500 w-full sm:w-auto"
            >
              <FileText size={16} />
              Resume Analyzer
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
