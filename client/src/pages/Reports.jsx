import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import DashboardLayout from "../layouts/DashboardLayout";

import CategoryChart from "../components/CategoryChart";
import MonthlyActivityChart from "../components/MonthlyActivityChart";
import DashboardCard from "../components/DashboardCard";

import { exportActivitiesPDF } from "../utils/exportPDF";
import { exportActivitiesExcel } from "../utils/exportExcel";

export default function Reports() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalActivities: 0,
    totalParticipants: 0,
    totalCategories: 0,
    recentActivities: [],
    activities: [],
  });

 const [selectedYear, setSelectedYear] = useState("2025-26");

const [selectedClub, setSelectedClub] = useState("");

const [selectedType, setSelectedType] = useState("");

const [selectedSemester, setSelectedSemester] = useState("");

const [searchTerm, setSearchTerm] = useState("");

const [sortOrder, setSortOrder] = useState("asc");

  const [loading, setLoading] = useState(true);

  const fetchReportsData = async () => {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, [selectedYear]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-5 text-gray-500 text-lg">Generating Analytics...</p>
        </div>
      </DashboardLayout>
    );
  }

  const hasData = stats.activities && stats.activities.length > 0;
   
    const filteredActivities = [...(stats.activities || [])]

  .filter((activity) => {
    const matchesSearch =
      searchTerm === "" ||
      activity.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      activity.club
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      activity.activityType
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesClub =
      selectedClub === "" ||
      activity.club
        ?.toLowerCase()
        .includes(selectedClub.toLowerCase());

    const matchesType =
      selectedType === "" ||
      activity.activityType === selectedType;

    const matchesSemester =
      selectedSemester === "" ||
      activity.semester === selectedSemester;

    return (
      matchesSearch &&
      matchesClub &&
      matchesType &&
      matchesSemester
    );
  })

  .sort((a, b) => {

    if (sortOrder === "asc") {

      return (
        new Date(a.startDate) -
        new Date(b.startDate)
      );

    }

    return (
      new Date(b.startDate) -
      new Date(a.startDate)
    );

  });




  return (
    <DashboardLayout>
      {/* Header */}

    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">

    <h1 className="text-4xl font-bold text-gray-800">

        Reports & Analytics

    </h1>

    <p className="text-gray-500 mt-2">

        Generate professional department reports

    </p>

    <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4 mt-8">

        <select
            value={selectedYear}
            onChange={(e)=>setSelectedYear(e.target.value)}
            className="border p-3 rounded-xl"
        >

            <option>2024-25</option>
            <option>2025-26</option>
            <option>2026-27</option>
            <option> 2027-28 </option>
            <option>2028-29</option>
            <option> 2029-30</option>

        </select>

        <input

            placeholder="Search"

            value={searchTerm}

            onChange={(e)=>setSearchTerm(e.target.value)}

            className="border p-3 rounded-xl"

        />

        <input

            placeholder="Club"

            value={selectedClub}

            onChange={(e)=>setSelectedClub(e.target.value)}

            className="border p-3 rounded-xl"

        />

        <select

            value={selectedType}

            onChange={(e)=>setSelectedType(e.target.value)}

            className="border p-3 rounded-xl"

        >

            <option value="">All Types</option>

            <option value="Workshop">Workshop</option>

            <option value="Seminar">Seminar</option>

            <option value="Guest Lecture">Guest Lecture</option>

            <option value="Industrial Visit">Industrial Visit</option>

            <option value="Hackathon">Hackathon</option>

        </select>

        <select

            value={selectedSemester}

            onChange={(e)=>setSelectedSemester(e.target.value)}

            className="border p-3 rounded-xl"

        >

            <option value="">All Semester</option>

            <option value="I">Semester I</option>

            <option value="II">Semester II</option>

            <option value="All">All</option>

        </select>

        <select

            value={sortOrder}

            onChange={(e)=>setSortOrder(e.target.value)}

            className="border p-3 rounded-xl"

        >

            <option value="asc">

                Date ↑

            </option>

            <option value="desc">

                Date ↓

            </option>

        </select>

    </div>

</div>

      {/* Export Section */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          p-6
          mb-8
        "
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Export Reports</h2>

        <p className="text-gray-500 mb-6">
          Download activity reports in PDF or Excel format.
        </p>

        <canvas
          id="reportChart"
          width="600"
          height="300"
          style={{
            display: "none",
          }}
        ></canvas>

        <div className="flex flex-wrap gap-4">
          <button
            disabled={!hasData}
            onClick={() =>
              exportActivitiesPDF(stats.activities || [], selectedYear)
            }
            className={`
    px-6
    py-3
    rounded-xl
    shadow-lg
    transition-all
    text-white

    ${
      hasData
        ? `
          bg-gradient-to-r
          from-red-600
          to-rose-600
          hover:shadow-xl
          hover:scale-[1.02]
        `
        : `
          bg-gray-300
          cursor-not-allowed
          shadow-none
        `
    }
  `}
          >
            Export PDF
          </button>

          <button
            disabled={!hasData}
            onClick={() =>
             exportActivitiesExcel(
    filteredActivities,
    selectedYear
)
            }
            className={`
    px-6
    py-3
    rounded-xl
    shadow-lg
    transition-all
    text-white

    ${
      hasData
        ? `
          bg-gradient-to-r
          from-green-600
          to-emerald-600
          hover:shadow-xl
          hover:scale-[1.02]
        `
        : `
          bg-gray-300
          cursor-not-allowed
          shadow-none
        `
    }
  `}
          >
            Export Excel
          </button>
        </div>
        {!hasData && (
          <p className="text-red-500 text-sm mt-4">
            No activities found for the selected academic year.
          </p>
        )}
      </div>

      {/* Statistics Cards */}

      {/* Quick Insights */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-gray-100
          p-6
          mb-8
        "
      >
        <h2 className="text-2xl font-bold text-gray-800">Quick Insights</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div
            className="
              bg-blue-100
              p-5
              rounded-2xl
            "
          >
            <p className="text-gray-500">Activities</p>

            <h3 className="text-3xl font-bold text-blue-700 mt-2">
              {stats.totalActivities}
            </h3>
          </div>

          <div
            className="
              bg-green-100
              p-5
              rounded-2xl
            "
          >
            <p className="text-gray-500">Participants</p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              {stats.totalParticipants}
            </h3>
          </div>

          <div
            className="
              bg-purple-100
              p-5
              rounded-2xl
            "
          >
            <p className="text-gray-500">Actity Types</p>

            <h3 className="text-3xl font-bold text-purple-700 mt-2">
              {stats.totalActivityTypes}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <CategoryChart

    activities={filteredActivities}

/>

<MonthlyActivityChart

    activities={filteredActivities}

/>
      </div>
    </DashboardLayout>
  );
}
