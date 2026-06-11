import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditReportModal({
  isOpen,
  onClose,
  report,
  onSuccess,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    academicYear: "",
    excelLink: "",
    remarks: "",
  });

  useEffect(() => {
    if (report) {
      setFormData({
        academicYear: report.academicYear || "",
        excelLink: report.excelLink || "",
        remarks: report.remarks || "",
      });
    }
  }, [report]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/report-archives/${report._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Report updated successfully");

      onSuccess();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update report"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Report Archive
            </h2>

            <p className="text-gray-500 mt-2">
              Update report information
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-xl transition"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Academic Year
            </label>

            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">
                Select Academic Year
              </option>

              <option value="2024-25">
                2024-25
              </option>

              <option value="2025-26">
                2025-26
              </option>

              <option value="2026-27">
                2026-27
              </option>

              <option value="2027-28">
                2027-28
              </option>

              <option value="2028-29">2028-29</option>
              <option value="2029-30">2029-30</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Excel Google Drive Link
            </label>

            <input
              type="url"
              name="excelLink"
              value={formData.excelLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Remarks
            </label>

            <textarea
              rows={4}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter remarks..."
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </div>
              ) : (
                "Update Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}