import { Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import {
  BarChart3,
  CalendarDays,
  FileSpreadsheet,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Navbar */}
      <Navbar2/>





      {/* Hero Section */}
      <section className="px-6 lg:px-20 py-20">

        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">

              Smart Academic Activity Platform

            </div>





            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">

              Simplify Department Activity Management

            </h1>





            {/* Description */}
            <p className="text-slate-500 text-lg leading-8 mt-8 max-w-2xl">

              Manage department events, workshops,
              seminars, reports, analytics, and
              academic activities from one centralized
              intelligent platform.

            </p>





            {/* CTA */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >

                Start Managing

                <ArrowRight size={20} />

              </Link>





              <Link
                to="/login"
                className="border border-slate-300 hover:border-slate-900 hover:text-slate-900 text-slate-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
              >
                Login
              </Link>

            </div>

          </div>





          {/* Right */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>





            {/* Main Card */}
            <div className="relative bg-white border border-slate-200 rounded-[32px] shadow-2xl p-8">

              {/* Top Stats */}
              <div className="grid grid-cols-2 gap-5">

                <div className="bg-indigo-50 rounded-2xl p-5">

                  <h3 className="text-slate-500 text-sm">
                    Activities
                  </h3>

                  <h1 className="text-4xl font-bold text-indigo-600 mt-3">
                    248
                  </h1>

                </div>





                <div className="bg-violet-50 rounded-2xl p-5">

                  <h3 className="text-slate-500 text-sm">
                    Reports
                  </h3>

                  <h1 className="text-4xl font-bold text-violet-600 mt-3">
                    64
                  </h1>

                </div>

              </div>





              {/* Analytics Area */}
              <div className="mt-8 bg-slate-100 rounded-3xl h-64 flex items-center justify-center">

                <BarChart3
                  size={90}
                  className="text-slate-400"
                />

              </div>

            </div>





            {/* Floating Card 1 */}
            <div className="absolute -top-6 -left-6 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-lg">

              <p className="font-semibold text-slate-700">
                Academic Reports
              </p>

            </div>





            {/* Floating Card 2 */}
            <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-lg">

              <p className="font-semibold text-slate-700">
                Smart Analytics
              </p>

            </div>

          </div>

        </div>

      </section>





      {/* Features */}
      <section className="px-6 lg:px-20 py-24 bg-white border-t border-slate-200">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">

            Everything Your Department Needs

          </h2>





          <p className="text-slate-500 text-lg leading-8 mt-6">

            Streamline academic workflows,
            simplify activity tracking, generate
            reports, and analyze department
            performance effortlessly.

          </p>

        </div>





        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">

          {/* Card 1 */}
          <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl">

            <CalendarDays
              size={48}
              className="text-indigo-600"
            />

            <h3 className="text-2xl font-bold mt-6 text-slate-800">
              Activity Tracking
            </h3>

            <p className="text-slate-500 leading-7 mt-4">

              Organize workshops, seminars,
              hackathons, and department
              events efficiently.

            </p>

          </div>





          {/* Card 2 */}
          <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl">

            <BarChart3
              size={48}
              className="text-violet-600"
            />

            <h3 className="text-2xl font-bold mt-6 text-slate-800">
              Smart Analytics
            </h3>

            <p className="text-slate-500 leading-7 mt-4">

              Visualize yearly trends and
              department performance using
              modern charts.

            </p>

          </div>





          {/* Card 3 */}
          <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl">

            <FileSpreadsheet
              size={48}
              className="text-emerald-600"
            />

            <h3 className="text-2xl font-bold mt-6 text-slate-800">
              Export Reports
            </h3>

            <p className="text-slate-500 leading-7 mt-4">

              Generate accreditation-ready
              PDF and Excel reports instantly.

            </p>

          </div>





          {/* Card 4 */}
          <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl">

            <ShieldCheck
              size={48}
              className="text-rose-600"
            />

            <h3 className="text-2xl font-bold mt-6 text-slate-800">
              Secure Access
            </h3>

            <p className="text-slate-500 leading-7 mt-4">

              Role-based authentication for
              admins, faculty, and students.

            </p>

          </div>

        </div>

      </section>





      {/* CTA */}
      <section className="px-6 lg:px-20 py-24">

        <div className="bg-slate-950 rounded-[40px] p-10 lg:p-20 text-center overflow-hidden relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl"></div>





          <div className="relative">

            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">

              Modernize Your Department Workflow

            </h2>





            <p className="text-slate-400 text-lg leading-8 mt-8 max-w-3xl mx-auto">

              Centralize academic activities,
              automate reporting, and gain
              meaningful department insights.

            </p>





            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold mt-10 transition-all duration-300 shadow-xl"
            >

              Get Started

              <ArrowRight size={20} />

            </Link>

          </div>

        </div>

      </section>





      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 lg:px-20 text-center text-slate-500">

        © 2026 DeptTrack. All rights reserved.

      </footer>

    </div>
  );
}