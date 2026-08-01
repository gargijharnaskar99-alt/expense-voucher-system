import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  PlusCircle,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-white">
          EVMS
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Expense Voucher System
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {/* Dashboard */}
        <NavLink
          to={`/${user?.role}/dashboard`}
          className={linkClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Employee Menu */}
        {user?.role === "employee" && (
          <>
            <NavLink
              to="/employee/my-expenses"
              className={linkClass}
            >
              <Receipt size={20} />
              My Expenses
            </NavLink>

            <NavLink
              to="/employee/add-expense"
              className={linkClass}
            >
              <PlusCircle size={20} />
              Add Expense
            </NavLink>
          </>
        )}

        {/* Admin Menu */}
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/admin/expenses"
              className={linkClass}
            >
              <Receipt size={20} />
              All Expenses
            </NavLink>
          </>
        )}

      </nav>

      {/* User Info */}
      <div className="px-5 py-4 border-t border-slate-700">

        <div className="mb-4">

          <p className="text-white font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-gray-400 capitalize">
            {user?.role}
          </p>

        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}