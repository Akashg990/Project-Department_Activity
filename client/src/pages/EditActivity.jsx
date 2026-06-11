import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import EditConfirmModal from "../components/EditConfirmModal";
import { FiTrash2 } from "react-icons/fi";

export default function EditActivity() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showEditModal, setShowEditModal] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [

  resourcePersons,

  setResourcePersons,

] = useState([
  {
    name: "",
    designation: "",
  },
]);

  const [formData, setFormData] = useState({

  title: "",

  club: "",

  activityType: "",

  startDate: "",

  endDate: "",

  venue: "",

  academicYear: "",

  semester: "",

  facultyCoordinator: "",

  studentCoordinator: "",

  participants: "",

  googleDriveLink: "",

});


const predefinedClubs = [
  "CSI",
  "IEEE",
  "ISTE",
  "IETE",
  "COMET",
  "Department",
];

const predefinedTypes = [

    "Workshop",

    "Seminar",

    "Guest Lecture",

    "SDP",

    "FDP",

    "Industrial Visit",

    "Competition",

    "Hackathon",

    "Webinar",

    "Placement Training",

    "Higher Studies Seminar",

];





const [customClub, setCustomClub] = useState("");
  const [customActivityType, setCustomActivityType] =
  useState("");

  // FETCH SINGLE ACTIVITY
const fetchActivity = async () => {

  try {

    const response =
      await axios.get(

        `http://localhost:5000/api/activities/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${user.token}`,

          },

        }

      );

   const activityData = response.data;

const formattedData = {
  ...activityData,
  startDate: activityData.startDate
    ? activityData.startDate.slice(0, 10)
    : "",
  endDate: activityData.endDate
    ? activityData.endDate.slice(0, 10)
    : "",
};

if (predefinedClubs.includes(formattedData.club)) {

  setFormData(formattedData);

} else {

  setFormData({
    ...formattedData,
    club: "Other",
  });

  setCustomClub(activityData.club);

}



if (
 predefinedTypes.includes(activityData.activityType)
) {
  setFormData((prev) => ({
    ...prev,
    activityType: activityData.activityType,
  }));
} else {
  setFormData((prev) => ({
    ...prev,
    activityType: "Other",
  }));

  setCustomActivityType(activityData.activityType);
}


setExistingImages(activityData.images || []);

setResourcePersons(activityData.resourcePersons || []);

  } catch (error) {

    console.log(error);

    toast.error(

      "Failed to fetch activity"

    );

  }

};


const addResourcePerson = () => {

  setResourcePersons([

    ...resourcePersons,

    {

      name: "",

      designation: "",

    },

  ]);

};

const removeResourcePerson = (

  index

) => {

  const updated =
    [...resourcePersons];

  updated.splice(index, 1);

  setResourcePersons(updated);

};

const handleResourcePersonChange = (

  index,

  field,

  value

) => {

  const updated =
    [...resourcePersons];

  updated[index][field] =
    value;

  setResourcePersons(updated);

};

useEffect(() => {
  fetchActivity();
}, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // OPEN CONFIRM MODAL
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    setImages(files);
  };

  // CONFIRM UPDATE
  const confirmUpdate = async () => {
   
    setLoading(true)

    try {
      const totalImages = existingImages.length + images.length;

      if (totalImages > 4) {
        toast.error("Maximum 4 images allowed");
        return;
      }

      const form = new FormData();

     const finalClub =
  formData.club === "Other"
    ? customClub
    : formData.club;

const finalActivityType =
  formData.activityType === "Other"
    ? customActivityType
    : formData.activityType;

Object.keys(formData).forEach((key) => {
  if (
    key !== "customClub" &&
    key !== "activityType"
  ) {
    form.append(key, formData[key]);
  }
});

form.set("club", finalClub);
form.set("activityType", finalActivityType);

   const validResourcePersons = resourcePersons.filter(
  (person) => person.name.trim() !== ""
);

form.append(
  "resourcePersons",
  JSON.stringify(validResourcePersons)
);

      form.append("existingImages", JSON.stringify(existingImages));
      form.append("deletedImages", JSON.stringify(deletedImages));
      images.forEach((image) => {
        form.append("images", image);
      });

      await axios.put(`http://localhost:5000/api/activities/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Activity Updated Successfully");

      setShowEditModal(false);

      navigate("/activities");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

 const removeImage = (

  index

) => {

  const image =
    existingImages[index];

  setDeletedImages([

    ...deletedImages,

    image.public_id,

  ]);

  setExistingImages(

    existingImages.filter(

      (_, i) =>

        i !== index

    )

  );

};

  return (
    <DashboardLayout>
      {/* Page Container */}
      <div className=" bg-white
    max-w-6xl
    mx-auto
    p-8
    rounded-3xl
    shadow-xl
    border
    border-gray-100">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Edit Activity</h1>

          <p className="text-gray-500 mt-2">
            Update department activity details
          </p>

          <div
  className="
    inline-flex
    mt-4
    bg-blue-50
    text-blue-700
    px-4
    py-2
    rounded-full
    text-sm
    font-medium
  "
>
  Activity Editor
</div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Activity Title"
            value={formData.title}
            onChange={handleChange}
            className="border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

          {/* Date */}
          <input
            type="date"
            name="startDate"
          name="startDate"
          onChange={handleChange}
value={formData.startDate}
            className="border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

          <input
type="date"
name="endDate"
value={formData.endDate}
onChange={handleChange}
className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
/>

          {/* Venue */}
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            className="border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

         


<div className="space-y-3">

  <select
    name="club"
    value={formData.club}
    onChange={handleChange}
    className="border border-gray-200 p-3 rounded-xl w-full"
  >

    <option value="">Select Club</option>

    <option value="CSI">CSI</option>

    <option value="IEEE">IEEE</option>

    <option value="ISTE">ISTE</option>

    <option value="IETE">IETE</option>

    <option value="COMET">COMET</option>

    <option value="Department">Department</option>

    <option value="Other">Other</option>

  </select>

  {formData.club === "Other" && (

    <input

      type="text"

      placeholder="Enter Club Name"

      value={customClub}

      onChange={(e) =>
        setCustomClub(e.target.value)
      }

      className="
      border
      border-gray-200
      p-3
      rounded-xl
      w-full
      h-12
      focus:ring-2
      focus:ring-blue-500
      "

    />

  )}

</div>


<div className="space-y-3">
 <select

name="activityType"

value={formData.activityType}

onChange={handleChange}

className="border border-gray-200 w-full   p-3 rounded-xl"

>

<option value="">

Select Activity Type

</option>

<option value="Workshop">

Workshop

</option>

<option value="Seminar">

Seminar

</option>

<option value="Guest Lecture">

Guest Lecture

</option>

<option value="SDP">

Skill Development Program

</option>

<option value="FDP">

Faculty Development Program

</option>

<option value="Industrial Visit">

Industrial Visit

</option>

<option value="Competition">

Competition

</option>

<option value="Hackathon">

Hackathon

</option>

<option value="Webinar">

Webinar

</option>

  <option value="Other">Other</option>


 

</select>

  {formData.activityType === "Other" && (
  <input
    type="text"
    value={customActivityType}
    placeholder="Enter Custom Activity Type"
    onChange={(e) =>
      setCustomActivityType(e.target.value)
    }
    className="border h-12 border-gray-200 p-3 rounded-xl mt-3 w-full"
  />
)}


</div>
 



          {/* Academic Year */}
          <input
            type="text"
            name="academicYear"
            placeholder="Academic Year"
            value={formData.academicYear}
            onChange={handleChange}
            className="border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

      <select

name="semester"

value={formData.semester}

onChange={handleChange}

className="border border-gray-200 p-3 rounded-xl"

>

<option value="">

Select Semester

</option>

<option value="I">

Semester I

</option>

<option value="II">

Semester II

</option>



<option value="All">

All

</option>

</select>



          {/* Organizer */}
         <input

type="text"

name="facultyCoordinator"

placeholder="Faculty Coordinator"

value={formData.facultyCoordinator}

onChange={handleChange}

className="border border-gray-200 p-3 rounded-xl"

/>

<input

type="text"

name="studentCoordinator"

placeholder="Student Coordinator"

value={formData.studentCoordinator}

onChange={handleChange}

className="border border-gray-200 p-3 rounded-xl"

/>

          {/* Participants */}
          <input
            type="number"
            min={0}
            name="participants"
            placeholder="Participants"
            value={formData.participants}
            onChange={handleChange}
            className="border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

          <div className="md:col-span-2">

<h2 className="text-xl font-bold mb-5">

Resource Persons

</h2>

{

resourcePersons.map(

(person,index)=>(

<div

key={index}

className="grid md:grid-cols-3 gap-4 mb-4"

>

<input

type="text"

value={person.name}

placeholder="Name"

onChange={(e)=>

handleResourcePersonChange(

index,

"name",

e.target.value

)

}

className="border p-3 rounded-xl"

/>

<input

type="text"

value={person.designation}

placeholder="Designation"

onChange={(e)=>

handleResourcePersonChange(

index,

"designation",

e.target.value

)

}

className="border p-3 rounded-xl"

/>

<button
    onClick={() => removeResourcePerson(index)}
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

)

)

}

<button

type="button"

onClick={addResourcePerson}

className="bg-blue-600 text-white px-5 py-2 rounded-xl"

>

+ Add Resource Person

</button>

</div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Current Images</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="  relative
    overflow-hidden
    rounded-2xl
    shadow-md">
                  <img
                    src={image.url}
                    alt="activity"
                    className="
            w-full
  h-36
  object-cover
  hover:scale-105
  transition-all
  duration-300
          "
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="
           absolute
  top-3
  right-3
  bg-red-600
  hover:bg-red-700
  text-white
  px-3
  py-1.5
  rounded-xl
  shadow-lg
  transition
          "
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">Upload New Images</label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className=" w-full
  border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  file:bg-blue-50
  file:text-blue-700
  file:border-0
  file:px-4
  file:py-2
  file:rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Google Drive Album Link
            </label>

            <input
              type="url"
              name="googleDriveLink"
              value={formData.googleDriveLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className=" w-full
  border
  border-gray-200
  p-3
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500"
            />
          </div>


          <div>
  <label className="block font-medium mb-2">
    News Report Link
  </label>

  <input
    type="url"
    name="newsReportLink"
    value={formData.newsReportLink}
    onChange={handleChange}
    placeholder="https://..."
    className="
      w-full
      border
      border-gray-200
      p-3
      rounded-xl
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />
</div>
             

          {/* Submit Button */}
          <button  disabled={loading} className="bg-gradient-to-r
  from-blue-600
  to-indigo-600
  text-white
  p-4
  rounded-xl
  font-semibold
  shadow-lg
  hover:shadow-xl
  hover:scale-[1.01]
  transition-all
  md:col-span-2">
            {loading ? (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      Updating...
    </div>
  ) : (
    "Update Activity"
  )}
          </button>
        </form>
      </div>

      {/* CONFIRM MODAL */}
      <EditConfirmModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={confirmUpdate}
        Loading={() => setLoading(true)}
      />
    </DashboardLayout>
  );
}
