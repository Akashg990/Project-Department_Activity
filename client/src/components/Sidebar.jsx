import {
  LayoutDashboard,
  CalendarDays,
  PlusSquare,
  Trophy,
  Users,
  LogOut,
  FileBarChart2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user.role;

  const handleLogout = () => {
    // REMOVE USER
    localStorage.removeItem("user");

    // REDIRECT
    navigate("/");
    toast.success("Logout Successfully");
  };
 return (
  <div
  className="
    w-[280px]
    h-screen
    overflow-y-auto
    bg-slate-900
    text-white
    flex
    flex-col
    border-r
    border-slate-800
    shadow-2xl

    lg:fixed
    lg:left-0
    lg:top-0
  "
>

    {/* Logo Section */}
    <div className="p-6 border-b border-slate-800">

      <h1 className="text-2xl font-bold">
        Dept<span className="text-blue-400">Track</span>
      </h1>

      <p className="text-slate-400 text-sm mt-1">
        Activity Management Portal
      </p>

    </div>

    {/* User Card */}
    <div className="p-5">

      <div
  className="
    bg-slate-800
    rounded-2xl
    p-4
    flex
    items-center
    gap-3
    hover:bg-slate-700
    transition
  "
>

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            font-bold
            text-lg
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>

          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-400 capitalize">
            {user?.role}
          </p>

        </div>

      </div>

    </div>

    {/* Navigation */}
    <div className="flex-1
    px-4
    space-y-2
    overflow-y-auto">

      <div className="px-4 mb-3">

  <p
    className="
      text-xs
      uppercase
      tracking-wider
      text-slate-400
      font-semibold
    "
  >
    Navigation
  </p>

</div>

      <Link
        to="/dashboard"
        className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          transition-all
          duration-200
        "
      >
        <LayoutDashboard size={20} />
        Dashboard
      </Link>

      <Link
        to="/activities"
        className="
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          transition-all
          duration-200
        "
      >
        <CalendarDays size={20} />
        Activities
      </Link>

      {(role === "admin" ||
        role === "faculty") && (
        <Link
          to="/add-activity"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-800
            transition-all
            duration-200
          "
        >
          <PlusSquare size={20} />
          Add Activity
        </Link>
      )}

      {(role === "admin" ||
        role === "faculty") && (
        <Link
          to="/reports"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-800
            transition-all
            duration-200
          "
        >
          <FileBarChart2 size={20} />
          Reports
        </Link>

      )}

      {(role === "admin" || role === "faculty") && (

  <Link
    to="/achievements"
    className="
      flex
      items-center
      gap-3
      p-3
      rounded-xl
      hover:bg-slate-800
      transition-all
      duration-200
    "
  >

    <Trophy size={20} />

    Achievements

  </Link>

)}

    



      {(role === "admin" || "faculty") &&(
       
       <Link
          to="/report-archives"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-800
            transition-all
            duration-200
          "
        >
          <FileBarChart2 size={20} />
          Reports Archives
        </Link>


      )}

      {role === "admin" && (
        <Link
          to="/users"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-slate-800
            transition-all
            duration-200
          "
        >
          <Users size={20} />
          Faculty Management
        </Link>
      )}

    </div>

    {/* Logout */}
    <div className="p-5 border-t border-slate-800">

      <button
        onClick={handleLogout}
        className="
  w-full
  flex
  items-center
  justify-center
  gap-3
  bg-gradient-to-r
  from-red-600
  to-rose-600
  hover:from-red-700
  hover:to-rose-700
  py-3
  rounded-xl
  shadow-lg
  hover:shadow-xl
  transition-all
  duration-200
  font-medium
"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>

  </div>
);
}
