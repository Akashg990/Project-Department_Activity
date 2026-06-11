import { Link } from "react-router-dom";

export default function Navbar2() {
  return (
     <nav className="flex items-center justify-between absolute w-full px-6 lg:px-20 py-4 bg-slate-950 border-b border-slate-800">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
           <Link to="/">
               DeptTrack
            </Link>
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold"
          >
            Get Started
          </Link>

        </div>

      </nav>
  );
}