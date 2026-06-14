import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import DashboardLayout from "../layouts/DashboardLayout";
import AddReportModal from "../components/AddReportModal";
import EditReportModal from "../components/EditReportModal";

import {
  FiExternalLink,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ReportArchives() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingReport, setEditingReport] =
  useState(null);

const [showEditModal, setShowEditModal] =
  useState(false);
const [showModal, setShowModal] = useState(false);
  const fetchReports = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/report-archives",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setReports(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

   const handleEdit = (report) => {

  setEditingReport(report);

  setShowEditModal(true);

};


const handleDelete = async (id) => {

  const result = await Swal.fire({

    title: "Delete Report?",

    text: "This action cannot be undone.",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#dc2626",

    confirmButtonText: "Delete",

  });

  if (!result.isConfirmed) return;

  try {

    await axios.delete(

      `http://localhost:5000/api/report-archives/${id}`,

      {

        headers: {

          Authorization: `Bearer ${user.token}`,

        },

      }

    );

    toast.success("Report Deleted");

    fetchReports();

  }

  catch {

    toast.error("Delete Failed");

  }

};


  useEffect(() => {

    fetchReports();

  }, []);

  return (

    <DashboardLayout>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className=" text-3xl inline-flex
      
      bg-blue-100
      text-black-700
      p-4
    
      rounded-full
      font-medium">

              Report Archives

            </h1>

            <p className="text-gray-500 mt-2">

              Store and manage yearly department reports

            </p>

          </div>

        <button

onClick={() => setShowModal(true)}

className="bg-blue-600 text-white px-6 py-3 rounded-xl"

>

+ Add Report

</button>

        </div>

        {

          loading ?

          <div className="text-center py-20">

            Loading...

          </div>

          :

          reports.length === 0 ?

          <div className="text-center py-20 text-gray-500">

            No Archived Reports Found

          </div>

          :

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {

              reports.map((report) => (

                <div
                  key={report._id}
                  className="
bg-white
rounded-3xl
border
border-gray-100
shadow-lg
p-6
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
                >

                  <div className="flex justify-between items-center">

  <h2 className="text-2xl font-bold text-gray-800">

    {report.academicYear}

  </h2>

  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

    Archived

  </span>

</div>

                 <div className="grid grid-cols-2 gap-4 mt-5">

  <div className="bg-blue-50 rounded-xl p-3">

    <p className="text-sm text-gray-500">

      Activities

    </p>

    <h3 className="text-2xl font-bold text-blue-700">

      {report.totalActivities}

    </h3>

  </div>

  <div className="bg-green-50 rounded-xl p-3">

    <p className="text-sm text-gray-500">

      Participants

    </p>

    <h3 className="text-2xl font-bold text-green-700">

      {report.totalParticipants}

    </h3>

  </div>

</div>



                  <p className="mt-4 text-gray-500">

                    {report.remarks}

                  </p>

                  <div className="flex justify-end items-center gap-3 mt-6">

  {/* Open Report */}

  <a
    href={report.excelLink}
    target="_blank"
    rel="noreferrer"
    className="
    flex-1
    
    bg-gradient-to-r
    from-green-600
    to-emerald-600
    text-white
    py-3
    rounded-xl
    text-center
    font-semibold
    hover:shadow-lg
    transition
    "
  >
    Open Report
  </a>

  {/* Edit */}

  <button
    onClick={() => handleEdit(report)}
    title="Edit Report"
    className="
      w-11
      h-11
      rounded-xl
      bg-blue-50
      text-blue-600
      flex
      items-center
      justify-center
      transition-all
      duration-200
      hover:bg-blue-600
      hover:text-white
      hover:scale-105
    "
  >
    <FiEdit2 size={19} />
  </button>

  {/* Delete */}

  <button
    onClick={() => handleDelete(report._id)}
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

</div>

                </div>

              ))

            }

          </div>

        }

      </div>

    <AddReportModal

isOpen={showModal}

onClose={() => setShowModal(false)}

onSuccess={fetchReports}

/>

<EditReportModal
  isOpen={showEditModal}
  onClose={() => {
    setShowEditModal(false);
    setEditingReport(null);
  }}
  report={editingReport}
  onSuccess={fetchReports}
/>


    </DashboardLayout>

  );

}