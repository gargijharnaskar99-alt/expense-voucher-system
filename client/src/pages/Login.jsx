import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Wallet } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const user = await login(
        data.email,
        data.password
      );

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="flex justify-center mb-6">

          <div className="bg-blue-600 p-4 rounded-full">

            <Wallet
              size={35}
              className="text-white"
            />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center">
          Expense Voucher
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <input
              type="email"
              placeholder="Email"

              {...register("email", {
                required: "Email is required",
              })}

              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Password"

              {...register("password", {
                required: "Password is required",
              })}

              className="w-full border rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"

              onClick={() =>
                setShowPassword(!showPassword)
              }

              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          <button
            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="text-center mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}