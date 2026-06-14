import { useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function AddAchievementModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    academicYear: "",
    semester: "",
    googleDriveLink: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      academicYear: "",
      semester: "",
      googleDriveLink: "",
      remarks: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        "/achievements",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Achievement Added Successfully");

      resetForm();

      onSuccess();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add achievement"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">

              Add Achievement

            </h2>

            <p className="text-gray-500 mt-2">

              Store department achievements and certificates

            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition"
          >
            ✕

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Achievement Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-xl p-3"
            >

              <option value="">

                Select Category

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

            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-xl p-3"
            >

              <option value="">

                Academic Year

              </option>

              <option>2024-25</option>

              <option>2025-26</option>

              <option>2026-27</option>

              <option>2027-28</option>
              <option>2028-29</option>
              <option>2029-30</option>

            </select>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-xl p-3"
            >

              <option value="">

                Select Semester

              </option>

              <option>I</option>

              <option>II</option>

            </select>

            <input
              type="url"
              name="googleDriveLink"
              placeholder="Google Drive Link"
              value={formData.googleDriveLink}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <textarea
            rows={5}
            name="remarks"
            placeholder="Remarks / Description"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              transition-all
              disabled:opacity-60
              disabled:hover:scale-100
              "
            >

              {loading ? (
                <div className="flex items-center">

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>

                  Saving...

                </div>
              ) : (
                "Add Achievement"
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}