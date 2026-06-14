
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

import {
  Calendar,
  MapPin,
  Users,
  GraduationCap,
  BookOpen,
  User,
  FolderOpen,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getActivityStatus } from "../utils/activityStatus";

export default function ActivityDetails() {

  const { id } = useParams();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const [activity, setActivity] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchActivity = async () => {

    try {

      const response =
        await axios.get(

          `/activities/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${user.token}`,

            },

          }

        );

      setActivity(response.data);

    } catch (error) {

      toast.error(

        "Failed to load activity"

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchActivity();

  }, [id]);

  const handleDeleteImage = async (
    publicId
  ) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/activities/${id}/image`,

        {

          headers: {

            Authorization:
              `Bearer ${user.token}`,

          },

          data: {

            publicId,

          },

        }

      );

      toast.success(

        "Image Deleted"

      );

      fetchActivity();

    } catch (error) {

      toast.error(

        error.response?.data?.message

      );

    }

  };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex flex-col items-center justify-center py-40">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-6 text-gray-500">

            Loading Activity...

          </p>

        </div>

      </DashboardLayout>

    );

  }

  if (!activity) {

    return (

      <DashboardLayout>

        <div className="bg-white rounded-3xl p-16 text-center shadow-lg">

          <h2 className="text-4xl font-bold text-red-600">

            Activity Not Found

          </h2>

        </div>

      </DashboardLayout>

    );

  }

  const status = getActivityStatus(

    activity.startDate,

    activity.endDate

  );
return (

<DashboardLayout>

<div className="max-w-7xl mx-auto space-y-8">

{/* ================= HERO ================= */}

<div className="relative overflow-hidden rounded-3xl shadow-xl">

{activity.images?.length > 0 ? (

<img

src={activity.images[0].url}

alt={activity.title}

className="w-full h-[500px] object-cover"

/>

) : (

<div className="h-[500px] bg-gradient-to-r from-blue-700 to-indigo-700"></div>

)}

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

<div className="absolute bottom-0 left-0 p-10 w-full">

<div className="flex flex-wrap gap-3 mb-5">

<span

className={`

px-5

py-2

rounded-full

font-semibold

${

status === "Upcoming"

? "bg-blue-500 text-white"

: status === "Ongoing"

? "bg-green-500 text-white"

: "bg-gray-800 text-white"

}

`}

>

{status}

</span>

<span className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full">

{activity.club}

</span>

<span className="bg-indigo-500 text-white px-5 py-2 rounded-full">

{activity.activityType}

</span>

</div>

<h1 className="text-5xl font-bold text-white">

{activity.title}

</h1>

<p className="text-gray-200 mt-3 text-lg">

{activity.academicYear} • Semester {activity.semester}

</p>

</div>

</div>

{/* ================= INFORMATION ================= */}

<div className="grid lg:grid-cols-3 gap-6">

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<Calendar className="text-blue-600"/>

<h2 className="font-bold text-xl">

Start Date

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.startDate?.slice(0,10)}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<Calendar className="text-green-600"/>

<h2 className="font-bold text-xl">

End Date

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.endDate?.slice(0,10)}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<MapPin className="text-red-500"/>

<h2 className="font-bold text-xl">

Venue

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.venue}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<Users className="text-purple-600"/>

<h2 className="font-bold text-xl">

Participants

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.participants}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<GraduationCap className="text-orange-500"/>

<h2 className="font-bold text-xl">

Faculty Coordinator

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.facultyCoordinator}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-7">

<div className="flex items-center gap-3">

<User className="text-indigo-500"/>

<h2 className="font-bold text-xl">

Student Coordinator

</h2>

</div>

<p className="mt-5 text-gray-600">

{activity.studentCoordinator}

</p>

</div>

</div>



{activity.resourcePersons?.length > 0 && (

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-3xl font-bold mb-6">

Resource Persons

</h2>

<div className="grid md:grid-cols-2 gap-5">

{activity.resourcePersons.map((person,index)=>(

<div
key={index}
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<h3 className="font-bold text-xl">

{person.name}

</h3>

<p className="text-gray-500 mt-2">

{person.designation}

</p>

</div>

))}

</div>

</div>

)}


{/* ================= GALLERY ================= */}

{activity.images?.length > 0 && (

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-3xl font-bold mb-6">

Activity Gallery

</h2>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

{activity.images.map((image,index)=>(

<div
key={index}
className="relative overflow-hidden rounded-3xl group"
>

<img

src={image.url}

alt="activity"

className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"

/>

{user.role!=="student" && (

<button

onClick={()=>handleDeleteImage(image.public_id)}

className="absolute top-4 right-4 bg-red-600 text-white rounded-xl px-4 py-2 opacity-0 group-hover:opacity-100 transition"

>

Delete

</button>

)}

</div>

))}

</div>

</div>

)}

{/* ================= DRIVE LINK ================= */}

{activity.googleDriveLink && (

<div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-5">

<div>

<h2 className="text-3xl font-bold">

Complete Event Album

</h2>

<p className="text-blue-100 mt-2">

View all event photographs and documents.

</p>

</div>

<a

href={activity.googleDriveLink}

target="_blank"

rel="noreferrer"

className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"

>

<FolderOpen className="inline mr-2"/>

Open Album

</a>

</div>

)}

<a
  href={activity.newsReportLink}
  target="_blank"
  rel="noreferrer"
  className="
    inline-flex
    items-center
    gap-2
    bg-red-200
    text-blue-800
    px-4
    py-2
    rounded-xl
    hover:bg-green-200
  "
>
  📰 View News Report
</a>


{/* ================= CREATED BY ================= */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-5">

Created By

</h2>

<p className="font-semibold">

{activity.createdBy?.name}

</p>

<p className="text-gray-500">

{activity.createdBy?.email}

</p>

</div>

 </div>
 </DashboardLayout>
)
}