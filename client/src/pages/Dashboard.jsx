

import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { getActivityStatus } from "../utils/activityStatus";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const [stats, setStats] = useState({
    totalActivities: 0,
    totalParticipants: 0,
    totalClubs: 0,
    totalActivityTypes: 0,
    upcomingActivities: 0,
    ongoingActivities: 0,
    completedActivities: 0,
    recentActivities: [],
  });

  const [selectedYear, setSelectedYear] = useState("2025-26");

  // FETCH DASHBOARD DATA
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/activities/stats/dashboard?year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setStats(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/activities", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.role === "student") {
      fetchActivities();

      setLoading(false);
    } else {
      fetchDashboardStats();
    }
  }, [selectedYear]);

  const upcomingActivities = activities.filter(
    (activity) => getActivityStatus(activity.date) === "Upcoming",
  );

  const ongoingActivities = activities.filter(
    (activity) => getActivityStatus(activity.date) === "Ongoing",
  );

  const completedActivities = activities.filter(
    (activity) => getActivityStatus(activity.date) === "Completed",
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (user.role === "student") {
    return (
      <DashboardLayout>
        <Navbar />

        {/* Hero Section */}

        <div
          className="
          bg-gradient-to-br
          from-blue-600
          via-indigo-600
          to-purple-600
          rounded-3xl
          p-8
          text-white
          shadow-xl
          mb-8
        "
        >
          <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>

          <p className="mt-3 text-blue-100 text-lg">
            Stay updated with all department activities and upcoming events.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Upcoming Events"
            value={upcomingActivities.length}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Ongoing Events"
            value={ongoingActivities.length}
            color="bg-green-600"
          />

          <DashboardCard
            title="Completed Events"
            value={completedActivities.length}
            color="bg-gray-700"
          />
        </div>

        {/* Upcoming Activities */}

        <div
          className="
          bg-white
          mt-8
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          p-6
        "
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Activities
          </h2>

          <p className="text-gray-500 mt-1">
            Activities scheduled in the future
          </p>

          <div className="mt-6 space-y-4">
            {upcomingActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>

                <p className="text-gray-500">No upcoming activities found.</p>
              </div>
            ) : (
              upcomingActivities.slice(0, 5).map((activity) => (
                <div
                  key={activity._id}
                  className="
                    border
                    border-gray-100
                    rounded-2xl
                    p-5
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {activity.title}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {activity.category}
                      </p>
                    </div>

                    <span
                      className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-1.5
                        rounded-full
                        text-sm
                        font-medium
                      "
                    >
                      Upcoming
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <p>📅 {activity.date}</p>

                    <p>📍 {activity.venue}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  } else {
    return (
      <DashboardLayout>
        <Navbar />
        {/* Analytics Header */}

        <div
          className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-gray-100
        p-6
        mb-6
        mt-2
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
      "
        >
          <div>
            {/* <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Analytics
        </h2> */}

            <h2 className="text-gray-800 mt-1">
              Filter statistics by academic year
            </h2>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="
          border
          border-gray-200
          px-4
          py-3
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
          >
            <option value="2024-25">2024-25</option>

            <option value="2025-26">2025-26</option>

            <option value="2026-27">2026-27</option>

            <option value="2027-28"> 2027-28 </option>

            <option value="2028-29" >2028-29</option>

             <option value="2029-30"> 2029-30</option>
          </select>
        </div>

        {/* Statistics Cards */}

        {/* Analytics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 shadow-xl">
            <p className="text-blue-100">Total Activities</p>

            <h2 className="text-4xl font-bold mt-3">{stats.totalActivities}</h2>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">
            <p className="text-green-100">Participants</p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.totalParticipants}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-6 shadow-xl">
            <p className="text-purple-100">Clubs</p>

            <h2 className="text-4xl font-bold mt-3">{stats.totalClubs}</h2>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-xl">
            <p className="text-orange-100">Activity Types</p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.totalActivityTypes}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <p className="text-gray-500">Upcoming</p>

            <h2 className="text-5xl font-bold text-blue-600 mt-4">
              {stats.upcomingActivities}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <p className="text-gray-500">Ongoing</p>

            <h2 className="text-5xl font-bold text-green-600 mt-4">
              {stats.ongoingActivities}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <p className="text-gray-500">Completed</p>

            <h2 className="text-5xl font-bold text-gray-700 mt-4">
              {stats.completedActivities}
            </h2>
          </div>
        </div>

       {/* Recent Activities */}

<div className="bg-white mt-8 rounded-3xl shadow-lg border border-gray-100 p-6">

  <h2 className="inline-flex bg-blue-50 text-gray-800 px-5 py-3 rounded-full font-semibold text-lg">
    Recent Activities
  </h2>

  <div className="mt-6 space-y-4">

    {stats.recentActivities.length === 0 ? (

      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500">No activities found</p>
      </div>

    ) : (

      stats.recentActivities.map((activity) => (

        <div
          key={activity._id}
          className="
            bg-gray-50
            border
            border-gray-100
            rounded-2xl
            p-5
            hover:bg-white
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Left Section */}

            <div>

              <h3 className="text-xl font-bold text-gray-800">
                {activity.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {activity.club}
                </span>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {activity.activityType}
                </span>

              </div>

            </div>

            {/* Right Section */}

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Start Date
              </p>

              <p className="font-semibold text-gray-800">
                {activity.startDate?.slice(0, 10)}
              </p>

            </div>

          </div>

        </div>

      ))

    )}

  </div>

</div>
      </DashboardLayout>
    );
  }
}
