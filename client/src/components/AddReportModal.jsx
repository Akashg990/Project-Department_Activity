import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddReportModal({

  isOpen,

  onClose,

  onSuccess,

}) {

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    academicYear: "",

    excelLink: "",

    remarks: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(

        "http://localhost:5000/api/report-archives",

        formData,

        {

          headers: {

            Authorization: `Bearer ${user.token}`,

          },

        }

      );

      toast.success("Report archived successfully");

      onSuccess();

      onClose();

      setFormData({

        academicYear: "",

        excelLink: "",

        remarks: "",

      });

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

          "Failed to archive report"

      );

    } finally {

      setLoading(false);

    }

  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-xl p-8">

        <h2 className="text-3xl font-bold mb-6">

          Archive Report

        </h2>

        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >

          <select

            name="academicYear"

            value={formData.academicYear}

            onChange={handleChange}

            className="w-full border p-3 rounded-xl"

            required

          >

            <option value="">

              Select Academic Year

            </option>

            <option>2024-25</option>

            <option>2025-26</option>

            <option>2026-27</option>
            <option>2027-28</option>
            <option>2028-29</option>
            <option>2029-30</option>

          </select>

          <input

            type="url"

            name="excelLink"

            placeholder="Google Drive Excel Link"

            value={formData.excelLink}

            onChange={handleChange}

            className="w-full border p-3 rounded-xl"

            required

          />

          <textarea

            rows="4"

            name="remarks"

            placeholder="Remarks"

            value={formData.remarks}

            onChange={handleChange}

            className="w-full border p-3 rounded-xl"

          />

          <div className="flex justify-end gap-3">

            <button

              type="button"

              onClick={onClose}

              className="px-5 py-3 rounded-xl bg-gray-200"

            >

              Cancel

            </button>

            <button

              disabled={loading}

              className="bg-blue-600 text-white px-6 py-3 rounded-xl"

            >

              {

                loading

                ?

                "Saving..."

                :

                "Save Report"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}