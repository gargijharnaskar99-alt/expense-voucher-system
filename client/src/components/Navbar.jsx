import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Expense Voucher Management System
        </h1>

        <p className="text-gray-500 text-sm">
          Manage your expenses efficiently
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <h2 className="font-semibold text-slate-800">
              {user?.name || "User"}
            </h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                user?.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user?.role?.toUpperCase()}
            </span>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}