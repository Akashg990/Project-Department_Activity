import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

import { Search, CalendarDays, Users, BookOpen, Layers } from "lucide-react";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

import DashboardLayout from "../layouts/DashboardLayout";
import DeleteModal from "../components/DeleteModal";
import { getActivityStatus } from "../utils/activityStatus";

export default function Activities() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user.role;

  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedClub, setSelectedClub] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedSemester, setSelectedSemester] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedActivityId, setSelectedActivityId] = useState(null);

  // Fetch Activities

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/activities", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setActivities(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Delete

  const openDeleteModal = (id) => {
    setSelectedActivityId(id);

    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `/activities/${selectedActivityId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      toast.success("Activity deleted successfully");

      fetchActivities();

      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // Filter

  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => {
        const search = searchTerm.trim().toLowerCase();

        // Global Search
        const searchableText = [
          activity.title,
          activity.club,
          activity.activityType,
          activity.facultyCoordinator,
          activity.studentCoordinator,
          activity.venue,
          activity.objective,
          activity.outcome,
          activity.description,
          activity.academicYear,
          activity.semester,
          ...(activity.resourcePersons || []).map(
            (person) => `${person.name} ${person.designation}`,
          ),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch = search === "" || searchableText.includes(search);

        // Club Filter (Partial Match)
        const matchesClub =
          selectedClub === "" ||
          activity.club?.toLowerCase().includes(selectedClub.toLowerCase());

        // Activity Type Filter (Partial Match)
        const matchesType =
          selectedType === "" ||
          activity.activityType
            ?.toLowerCase()
            .includes(selectedType.toLowerCase());

        // Academic Year
        const matchesYear =
          selectedYear === "" || activity.academicYear === selectedYear;

        // Semester
        const matchesSemester =
          selectedSemester === "" || activity.semester === selectedSemester;

        return (
          matchesSearch &&
          matchesClub &&
          matchesType &&
          matchesYear &&
          matchesSemester
        );
      })

      .sort((a, b) => {
        if (sortOrder === "asc") {
          return new Date(a.startDate) - new Date(b.startDate);
        }

        return new Date(b.startDate) - new Date(a.startDate);
      });
  }, [
    activities,
    searchTerm,
    selectedClub,
    selectedType,
    selectedYear,
    selectedSemester,
    sortOrder,
  ]);

  // Statistics

  const stats = {
    totalActivities: activities.length,

    totalParticipants: activities.reduce(
      (sum, activity) => sum + Number(activity.participants || 0),
      0,
    ),

    totalClubs: new Set(activities.map((item) => item.club)).size,

    totalTypes: new Set(activities.map((item) => item.activityType)).size,
  };

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
          <div>
            <h1
              className=" text-3xl inline-flex
      
      bg-blue-100
      text-black-700
      p-4
    
      rounded-full
      font-medium"
            >
              Department Activities
            </h1>

            <p className="text-slate-500 mt-2">
              Manage workshops, seminars, competitions and department events
            </p>
          </div>

          <div className="bg-blue-50 rounded-3xl px-8 py-5">
            <p className="text-blue-600 font-medium">Search Results</p>

            <h2 className="text-4xl font-bold text-blue-700">
              {filteredActivities.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <CalendarDays
            size={32}
            className="text-blue-600"
          />

          <p className="text-gray-500 mt-5">

            Activities

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalActivities}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <BookOpen
            size={32}
            className="text-green-600"
          />

          <p className="text-gray-500 mt-5">

            Clubs

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalClubs}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <Layers
            size={32}
            className="text-purple-600"
          />

          <p className="text-gray-500 mt-5">

            Activity Types

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalTypes}

          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <Users
            size={32}
            className="text-orange-600"
          />

          <p className="text-gray-500 mt-5">

            Participants

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {stats.totalParticipants}

          </h2>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-gray-400" />

            <input
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">All Clubs</option>
            <option value="CSI">CSI</option>
            <option value="IEEE">IEEE</option>
            <option value="ISTE">ISTE</option>
            <option value="IETE">IETE</option>
            <option value="COMET">COMET</option>
            <option value="Department">Department</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">All Types</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="Competition">Competition</option>
            <option value="Hackathon">Hackathon</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">Academic Year</option>
            <option>2024-25</option>
            <option>2025-26</option>
            <option>2026-27</option>
            <option> 2027-28 </option>

            <option>2028-29</option>

            <option> 2029-30</option>
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">All Semester</option>
            <option>I</option>
            <option>II</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="desc">Newest First</option>

            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Activities */}

      {loading ? (
        <div className="bg-white rounded-3xl shadow-lg p-20 flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <h2 className="text-xl font-semibold text-gray-700 mt-6">
            Loading Activities...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we fetch department records
          </p>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg p-20 text-center">
          <div className="text-7xl mb-6">📂</div>

          <h2 className="text-3xl font-bold text-gray-700">
            No Activities Found
          </h2>

          <p className="text-gray-500 mt-4">
            Try changing your filters or search keywords.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredActivities.map((activity) => {
            const status = getActivityStatus(
              activity.startDate,

              activity.endDate,
            );

            return (
              <div
                key={activity._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}

                  <div className="lg:w-72 h-64 lg:h-auto bg-slate-100">
                    {activity.images?.length > 0 ? (
                      <img
                        src={activity.images[0].url}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        📸
                      </div>
                    )}
                  </div>

                  {/* Content */}

                  <div className="flex-1 p-8">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">
                          {activity.title}
                        </h2>

                        <p className="text-gray-500 mt-2">{activity.venue}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                          {activity.club}
                        </span>

                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                          {activity.activityType}
                        </span>

                        <span
                          className={`

                          px-4

                          py-2

                          rounded-full

                          text-sm

                          font-semibold

                          ${
                            status === "Upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : status === "Ongoing"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                          }

                        `}
                        >
                          {status}
                        </span>
                      </div>
                    </div>

                    {/* Description */}

                    {/* Information Grid */}

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
                      <div>
                        <p className="text-sm text-gray-400">Academic Year</p>

                        <p className="font-semibold text-gray-700 mt-1">
                          {activity.academicYear}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Semester</p>

                        <p className="font-semibold text-gray-700 mt-1">
                          {activity.semester}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Participants</p>

                        <p className="font-semibold text-gray-700 mt-1">
                          {activity.participants}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">
                          Faculty Coordinator
                        </p>

                        <p className="font-semibold text-gray-700 mt-1">
                          {activity.facultyCoordinator}
                        </p>
                      </div>
                    </div>

                    {/* Dates */}

                    <div className="flex flex-wrap gap-8 mt-8 text-sm text-gray-500">
                      <div>📅 Start : {activity.startDate?.slice(0, 10)}</div>

                      <div>📅 End : {activity.endDate?.slice(0, 10)}</div>
                    </div>

                    {/* Actions */}

                    <div className="border-t border-gray-100 mt-8 pt-6 flex flex-wrap gap-4">
                      <Link
                        to={`/activities/${activity._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                      >
                        👁 View
                      </Link>

                      {(role === "admin" || role === "faculty") && (
                        // <Link

                        //   to={`/edit-activity/${activity._id}`}

                        //   className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"

                        // >

                        //   ✏ Edit

                        // </Link>

                        <Link
                          to={`/edit-activity/${activity._id}`}
                          title="Edit Report"
                          className="
      w-11
      h-11
      rounded-xl
      bg-green-50
      text-green-600
      flex
      items-center
      justify-center
      transition-all
      duration-200
      hover:bg-green-600
      hover:text-white
      hover:scale-105
    "
                        >
                          <FiEdit2 size={19} />
                        </Link>
                      )}

                      {(role === "admin" || "faculty") && (
                        // <button

                        //   onClick={() =>

                        //     openDeleteModal(activity._id)

                        //   }

                        //   className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"

                        // >

                        //   🗑 Delete

                        // </button>

                        <button
                          onClick={() => openDeleteModal(activity._id)}
                          title="Delete Report"
                          className="
      w-11
      h-11
      rounded-xl
      bg-red-50
      text-red-600
      flex
      items-center
      justify-center
      transition-all
      duration-200
      hover:bg-red-600
      hover:text-white
      hover:scale-105
    "
                        >
                          <FiTrash2 size={19} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
