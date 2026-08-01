import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus } from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {

  const { register: registerUser } = useAuth();

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

      await registerUser(data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        <div className="flex justify-center mb-6">

          <div className="bg-green-600 p-4 rounded-full">

            <UserPlus
              size={35}
              className="text-white"
            />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <input
              type="text"
              placeholder="Full Name"

              {...register("name", {
                required: "Name is required",
              })}

              className="w-full border rounded-lg p-3"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}

          </div>

          <div>

            <input
              type="email"
              placeholder="Email"

              {...register("email", {
                required: "Email is required",
              })}

              className="w-full border rounded-lg p-3"
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

              className="w-full border rounded-lg p-3 pr-12"
            />

            <button
              type="button"

              onClick={() =>
                setShowPassword(!showPassword)
              }

              className="absolute right-4 top-3"
            >
              {showPassword
                ? <EyeOff size={20}/>
                : <Eye size={20}/>}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          <div>

            <select
              {...register("role")}

              className="w-full border rounded-lg p-3"
            >

              <option value="employee">
                Employee
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          <button
            type="submit"

            disabled={loading}

            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center mt-8">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}