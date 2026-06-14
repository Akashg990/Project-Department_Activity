import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Navbar2 from "../components/Navbar2";
import toast from "react-hot-toast";
export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const data = await loginUser(formData);

    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);

    toast.success("Login Successfully");

    navigate("/dashboard");

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/dashboard");
    }
  }, []);

 return (

  <>
  <Navbar2/>

  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      {/* Logo / Title */}
      

      {/* Login Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="
                w-full
                border
                border-gray-300
                p-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="
                w-full
                border
                border-gray-300
                p-3
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="
                text-sm
                text-blue-600
                hover:text-blue-700
                font-medium
              "
            >
              Forgot Password?
            </Link>
          </div>

         <button
  type="submit"
  disabled={loading}
  className={`
    w-full
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    text-white
    p-3
    rounded-xl
    font-semibold
    shadow-lg
    transition-all
    duration-200
    flex
    justify-center
    items-center
    gap-2
    ${
      loading
        ? "opacity-80 cursor-not-allowed"
        : "hover:shadow-xl hover:scale-[1.02]"
    }
  `}
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Signing In...
    </>
  ) : (
    "Login"
  )}
</button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              hover:text-blue-700
            "
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>

  </div>
    </>
);
}
