import { useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [otpVerified, setOtpVerified] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const sendOtp = async () => {

    try {

      setLoading(true);

      await axios.post(
        "/auth/send-reset-otp",
        { email }
      );

      setOtpSent(true);

      toast.success(
        "OTP sent successfully"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };

  const verifyOtp = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          "/auth/verify-otp",
          {
            email,
            otp,
          }
        );

      if (
        response.data.verified
      ) {

        setOtpVerified(true);

        toast.success(
          "OTP verified"
        );

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };

  const resetPassword = async () => {

    try {

      setLoading(true);

      await axios.post(
        "/auth/reset-password",
        {
          email,
          password:
            newPassword,
        }
      );

      toast.success(
        "Password reset successful"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-900
        via-blue-900
        to-slate-800
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div className="w-full max-w-md">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Reset Password
          </h1>

          <p className="text-blue-100 mt-2">
            Recover your account securely
          </p>

        </div>

        {/* Card */}

        <div
          className="
            bg-white/95
            backdrop-blur-md
            rounded-3xl
            shadow-2xl
            p-8
            border
            border-white/20
          "
        >

          {/* Progress */}

          <div className="flex items-center justify-between mb-8">

            <div
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-bold
                ${
                  true
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }
              `}
            >
              1
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div
                className={`
                  h-full
                  bg-blue-600
                  transition-all
                  duration-300
                  ${
                    otpSent
                      ? "w-full"
                      : "w-0"
                  }
                `}
              />
            </div>

            <div
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-bold
                ${
                  otpSent
                    ? "bg-green-600"
                    : "bg-gray-300"
                }
              `}
            >
              2
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div
                className={`
                  h-full
                  bg-green-600
                  transition-all
                  duration-300
                  ${
                    otpVerified
                      ? "w-full"
                      : "w-0"
                  }
                `}
              />
            </div>

            <div
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-white
                font-bold
                ${
                  otpVerified
                    ? "bg-purple-600"
                    : "bg-gray-300"
                }
              `}
            >
              3
            </div>

          </div>

          {/* Email */}

          <input
            type="email"
            placeholder="Enter Email Address"
            disabled={otpSent}
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
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

          {!otpSent && (

            <button
              onClick={sendOtp}
              disabled={loading}
              className="
                w-full
                mt-4
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                p-3
                rounded-xl
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          )}

          {/* OTP */}

          {otpSent &&
            !otpVerified && (

              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    p-3
                    rounded-xl
                    mt-4
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

                <button
                  onClick={
                    verifyOtp
                  }
                  disabled={loading}
                  className="
                    w-full
                    mt-4
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-600
                    text-white
                    p-3
                    rounded-xl
                    font-semibold
                  "
                >
                  {loading
                    ? "Verifying..."
                    : "Verify OTP"}
                </button>

              </>

            )}

          {/* Reset Password */}

          {otpVerified && (

            <>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-gray-300
                  p-3
                  rounded-xl
                  mt-4
                  outline-none
                  focus:ring-2
                  focus:ring-purple-500
                "
              />

              <button
                onClick={
                  resetPassword
                }
                disabled={loading}
                className="
                  w-full
                  mt-4
                  bg-gradient-to-r
                  from-purple-600
                  to-indigo-600
                  text-white
                  p-3
                  rounded-xl
                  font-semibold
                "
              >
                {loading
                  ? "Updating..."
                  : "Reset Password"}
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );

}
