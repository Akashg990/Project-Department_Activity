import { useEffect, useMemo, useState } from "react";
import axios from "../utils/axiosInstance";
import DashboardLayout from "../layouts/DashboardLayout";

import AddAchievementModal from "../components/AddAchievementModal";
import EditAchievementModal from "../components/EditAchievementModal";

import {
  Search,
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  Trophy,
  GraduationCap,
  User,
  Building2,
} from "lucide-react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function AchievementArchives() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [achievements, setAchievements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [editingAchievement, setEditingAchievement] =
    useState(null);

  // Filters

  const [search, setSearch] = useState("");

  const [selectedYear, setSelectedYear] =
    useState("");

  const [selectedSemester, setSelectedSemester] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  // Fetch Achievements

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/achievements",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setAchievements(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Delete

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Achievement?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/achievements/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Achievement Deleted");

      fetchAchievements();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // Edit

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);

    setShowEditModal(true);
  };

  // Filter Logic

  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      const matchesSearch =
        search === "" ||
        achievement.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesYear =
        selectedYear === "" ||
        achievement.academicYear === selectedYear;

      const matchesSemester =
        selectedSemester === "" ||
        achievement.semester === selectedSemester;

      const matchesCategory =
        selectedCategory === "" ||
        achievement.category === selectedCategory;

      return (
        matchesSearch &&
        matchesYear &&
        matchesSemester &&
        matchesCategory
      );
    });
  }, [
    achievements,
    search,
    selectedYear,
    selectedSemester,
    selectedCategory,
  ]);

  // Statistics

  const totalAchievements =
    filteredAchievements.length;

  const studentAchievements =
    filteredAchievements.filter(
      (item) =>
        item.category === "Student Achievement"
    ).length;

  const facultyAchievements =
    filteredAchievements.filter(
      (item) =>
        item.category === "Faculty Achievement"
    ).length;

  const departmentAchievements =
    filteredAchievements.filter(
      (item) =>
        item.category ===
        "Department Achievement"
    ).length;
      return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                  <Trophy
                    className="text-yellow-600"
                    size={28}
                  />

                </div>

                <div>

                  <h1 className="text-4xl font-bold text-gray-800">

                    Achievements

                  </h1>

                  <p className="text-gray-500 mt-1">

                    Store and manage department achievements

                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={() => setShowModal(true)}
              className="
              flex
              items-center
              gap-2
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              px-6
              py-3
              rounded-2xl
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              transition-all
              "
            >

              <Plus size={20} />

              Add Achievement

            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg border">

            <p className="text-gray-500">

              Total Achievements

            </p>

            <h2 className="text-4xl font-bold mt-3 text-blue-700">

              {totalAchievements}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">

            <div className="flex items-center gap-3">

              <GraduationCap className="text-green-600" />

              <p className="text-gray-500">

                Student

              </p>

            </div>

            <h2 className="text-4xl font-bold mt-3 text-green-700">

              {studentAchievements}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">

            <div className="flex items-center gap-3">

              <User className="text-blue-600" />

              <p className="text-gray-500">

                Faculty

              </p>

            </div>

            <h2 className="text-4xl font-bold mt-3 text-blue-700">

              {facultyAchievements}

            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border">

            <div className="flex items-center gap-3">

              <Building2 className="text-purple-600" />

              <p className="text-gray-500">

                Department

              </p>

            </div>

            <h2 className="text-4xl font-bold mt-3 text-purple-700">

              {departmentAchievements}

            </h2>

          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl shadow-lg border p-6">

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search Achievement..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                w-full
                border
                rounded-xl
                pl-11
                pr-4
                py-3
                focus:ring-2
                focus:ring-blue-500
                outline-none
                "
              />

            </div>

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option value="">

                All Academic Years

              </option>

              <option>2024-25</option>

              <option>2025-26</option>

              <option>2026-27</option>

              <option>2027-28</option>

              <option>2028-29</option>
              <option>2029-30</option>

            </select>

            <select
              value={selectedSemester}
              onChange={(e) =>
                setSelectedSemester(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option value="">

                All Semesters

              </option>
            
              <option>I</option>

              <option>II</option>

              

            </select>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="border rounded-xl p-3"
            >

              <option value="">

                All Categories

              </option>

              <option>Student Achievement</option>

              <option>Faculty Achievement</option>

              <option>Department Achievement</option>

              <option>Certification</option>

              <option>Competition</option>

              <option>Placement</option>

              <option>Research</option>

              <option>Other</option>

            </select>

          </div>

        </div>

        {/* Cards */}

        {loading ? (

          <div className="text-center py-24 text-gray-500">

            Loading achievements...

          </div>

        ) : filteredAchievements.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-20 text-center">

            <Trophy
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-2xl font-bold mt-5 text-gray-700">

              No Achievements Found

            </h2>

            <p className="text-gray-500 mt-2">

              Try changing the filters or add a new achievement.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredAchievements.map(
              (achievement) => (

                <div
                  key={achievement._id}
                  className="
                  bg-white
                  rounded-3xl
                  border
                  border-gray-100
                  shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  p-6
                  "
                >

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-gray-800">

                        {achievement.title}

                      </h2>

                      <span
                        className="
                        inline-block
                        mt-3
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                        "
                      >

                        {achievement.category}

                      </span>

                    </div>

                    <Trophy
                      className="text-yellow-500"
                      size={28}
                    />

                  </div>

                  <p className="mt-5 text-gray-500">

                    {achievement.academicYear}

                    {" • "}

                    Semester {achievement.semester}

                  </p>

                  <p className="mt-4 text-gray-700">

                    {achievement.remarks}

                  </p>

                  <p className="mt-6 text-sm text-gray-400">

                    Created

                    {" "}

                    {new Date(
                      achievement.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <div className="flex justify-end  gap-3 mt-6">

                    <a
                      href={
                        achievement.googleDriveLink
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-green-50
                      text-green-600
                      flex
                      items-center
                      justify-center
                      hover:bg-green-600
                      hover:text-white
                      transition
                      "
                    >

                      <ExternalLink size={18} />

                    </a>

                    <button
                      onClick={() =>
                        handleEdit(achievement)
                      }
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      hover:bg-blue-600
                      hover:text-white
                      transition
                      "
                    >

                      <Pencil size={18} />

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          achievement._id
                        )
                      }
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-red-50
                      text-red-600
                      flex
                      items-center
                      justify-center
                      hover:bg-red-600
                      hover:text-white
                      transition
                      "
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

        <AddAchievementModal
          isOpen={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={fetchAchievements}
        />

        <EditAchievementModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingAchievement(null);
          }}
          achievement={editingAchievement}
          onSuccess={fetchAchievements}
        />

      </div>
    </DashboardLayout>
  );
}