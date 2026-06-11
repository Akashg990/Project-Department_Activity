import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";


export default function AddActivity() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [customActivityType, setCustomActivityType] = useState("");

 const [formData, setFormData] = useState({

  title: "",

  club: "",
  customClub :"",

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
   newsReportLink: "",

});

const [resourcePersons, setResourcePersons] =
  useState([
    {
      name: "",
      designation: "",
    },
  ]);

const addResourcePerson = () => {

  setResourcePersons([

    ...resourcePersons,

    {

      name: "",

      designation: "",

    },

  ]);

};

const removeResourcePerson = (index) => {

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


  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Image Limit Check
      if (images.length > 4) {
        toast.error("Maximum 4 images allowed");
        return;
      }


      const finalClub =
  formData.club === "Other"
    ? formData.customClub
    : formData.club;


     const finalActivityType =
    formData.activityType === "Other"
        ? customActivityType
        : formData.activityType;


      const form = new FormData();

      // Append Text Fields
     Object.keys(formData).forEach((key) => {
  if (
    key !== "customClub" &&
    key !== "activityType"
  ) {
    form.append(key, formData[key]);
  }
});

// overwrite club and activity type
form.set("club", finalClub);

form.set(
  "activityType",
  finalActivityType
);

form.set("club", finalClub);

      form.append(

  "resourcePersons",

  JSON.stringify(resourcePersons)

);



      // Append Images
      images.forEach((image) => {
        form.append("images", image);
      });

      await axios.post("http://localhost:5000/api/activities", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Activity Added Successfully");

      setFormData({
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

      setImages([]);
      setLoading(false);

      navigate("/activities");
    } catch (error) {
      console.log("ADD ACTIVITY ERROR:", error);
      console.log("RESPONSE:", error.response);
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add activity",
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-500">Creating Activity...</p>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="bg-white  mx-auto p-5 rounded-3xl shadow-xl border border-gray-100">
        <div className="mb-8">
          <h1 className=" text-3xl inline-flex
      
      bg-blue-100
      text-black-700
      p-4
    
      rounded-full
      font-medium">Activity Creation Form</h1>

          <p className="text-gray-500 mt-2">
            Create and publish a department activity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
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

          <input
            type="date"
             name="startDate"
  value={formData.startDate}
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

               <input
  type="date"
  name="endDate"
  value={formData.endDate}
  onChange={handleChange}
  className="
    border
    border-gray-200
    p-3
    rounded-xl
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
/>


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

          

           <div>
 

  <select
    name="club"
    value={formData.club}
    onChange={handleChange}
    className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
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
  <div className="py-2">
   

    <input
      type="text"
      name="customClub"
      value={formData.customClub}
      onChange={handleChange}
      placeholder="Enter club name"
      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
)}


</div>






        <select
    name="activityType"
    value={formData.activityType}
    onChange={handleChange}
    className="border border-gray-200 p-3 h-12 rounded-xl"
>

    <option value="">Select Activity Type</option>

    <option value="Workshop">Workshop</option>

    <option value="Seminar">Seminar</option>

    <option value="Guest Lecture">Guest Lecture</option>

    <option value="SDP">Skill Development Program</option>

    <option value="FDP">Faculty Development Program</option>

    <option value="Industrial Visit">Industrial Visit</option>

    <option value="Competition">Competition</option>

    <option value="Hackathon">Hackathon</option>

    <option value="Webinar">Webinar</option>

    <option value="Placement Training">Placement Training</option>

    <option value="Higher Studies Seminar">Higher Studies Seminar</option>

    <option  value="Other">Other</option>

</select>

{
    formData.activityType === "Other" && (

        <input
            type="text"
            placeholder="Enter Custom Activity Type"
            value={customActivityType}
            onChange={(e) =>
                setCustomActivityType(e.target.value)
            }
            className="
                border
                border-gray-200
                p-3
                rounded-xl
                mt-3
            "
        />

    )
}





          <select
            name="academicYear"
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
            required
          >
            <option value="">Select Academic Year</option>

            <option value="2023-24">2023-24</option>

            <option value="2024-25">2024-25</option>

            <option value="2025-26">2025-26</option>

            <option value="2026-27">2026-27</option>

            <option value="2027-28">2027-28</option>
          

            <option value="2028-29" >2028-29</option>

             <option value="2029-30"> 2029-30</option>
          </select>

          <select
  name="semester"
  value={formData.semester}
  onChange={handleChange}
  className="
    border
    border-gray-200
    p-3
    rounded-xl
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
>

  <option value="">
    Select Semester
  </option>

  <option value="I">Semester I</option>

  <option value="II">Semester II</option>


  <option value="All">All</option>

</select>
           



         <input
  type="text"
  name="facultyCoordinator"
  placeholder="Faculty Coordinator"
  value={formData.facultyCoordinator}
  onChange={handleChange}
  className="
    border
    border-gray-200
    p-3
    rounded-xl
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
/>

<input
  type="text"
  name="studentCoordinator"
  placeholder="Student Coordinator"
  value={formData.studentCoordinator}
  onChange={handleChange}
  className="
    border
    border-gray-200
    p-3
    rounded-xl
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
/>

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
  h-15
  rounded-xl
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
  transition"
          />

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
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

                 <div className="md:col-span-2">

<h2 className="text-xl font-bold mb-4">

Resource Persons

</h2>

{

resourcePersons.map(

(person,index)=>(

<div

key={index}

className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"

>

<input

type="text"

placeholder="Name"

value={person.name}

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

placeholder="Designation"

value={person.designation}

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

className="bg-blue-600 text-white px-4 py-2 rounded-xl"

>

+ Add Resource Person

</button>

</div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Activity Images
            </label>

            <div
              className="
      border-2
      border-dashed
      border-gray-300
      rounded-2xl
      p-6
      bg-slate-50
    "
            >
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="
        w-full
        file:bg-blue-50
        file:text-blue-700
        file:border-0
        file:px-4
        file:py-2
        file:rounded-lg
      "
              />

              <p className="text-sm text-gray-500 mt-3">
                Maximum 4 images allowed
              </p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="
          overflow-hidden
          rounded-2xl
          shadow-md
        "
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="
            w-full
            h-32
            object-cover
          "
                    />
                  </div>
                ))}
              </div>
            )}
          </div>



          <button className=" bg-gradient-to-r
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
            Add Activity
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
