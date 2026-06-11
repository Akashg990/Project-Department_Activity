import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import { registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Navbar2 from "../components/Navbar2";
import toast from "react-hot-toast";
export default function Register() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regloading, setRegloading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify your email first");

      return;

      
    }
    setRegloading(true);
    try {
      const data = await registerUser(formData);

      // Faculty/Admin Pending Approval
      if (data.message) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

      // Student Registration

      toast.success("Registration Successful, Please Login!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setRegloading(false);
    }
  };

  const sendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter email first");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: formData.email,
      });

      toast.success("OTP sent successfully");

      setOtpSent(true);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "OTP sending failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: formData.email,
          otp,
        },
      );

      if (response.data.verified) {
        setOtpVerified(true);

        toast.success("Email verified successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>

    <Navbar2/>
   
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 pt-20 py-5">

    <div className="w-full max-w-lg">

      

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex gap-2">

              <input
                type="email"
                name="email"
                disabled={otpSent}
                placeholder="Enter email"
                onChange={handleChange}
                required
                className="flex-1 border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={sendOtp}
                disabled={loading || otpVerified}
                className="
                  px-4
                  bg-blue-600
                  text-white
                  rounded-xl
                  hover:bg-blue-700
                  transition
                "
              >
                {loading ? "..." : "OTP"}
              </button>

            </div>
          </div>

          {otpVerified && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              ✓ Email verified successfully
            </div>
          )}

          {otpSent && !otpVerified && (

            <div className="space-y-3">

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-xl"
              />

              <button
                type="button"
                onClick={verifyOtp}
                className="
                  w-full
                  bg-green-600
                  text-white
                  p-3
                  rounded-xl
                  hover:bg-green-700
                  transition
                "
              >
                Verify OTP
              </button>

            </div>

          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>

            <select
              name="role"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Role
              </option>

              <option value="faculty">
                Faculty
              </option>

            </select>
          </div>

          <button
            disabled={regloading}
            className="
              w-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              p-3
              rounded-xl
              font-semibold
              shadow-lg
              hover:shadow-xl
              hover:scale-[1.02]
              transition-all
            "
          >
            {regloading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Login Here
          </Link>

        </div>

      </div>

    </div>

  </div>
   </>
);
}
