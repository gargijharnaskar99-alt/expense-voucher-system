import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  PlusCircle,
  Search,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold">EVMS</h2>
        <p className="text-sm text-gray-400">
          Expense Management
        </p>
      </div>

      <nav className="p-4 space-y-3">

        {/* Dashboard */}

        <NavLink
          to={`/${user.role}/dashboard`}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Employee */}

        {user.role === "employee" && (
          <>
            <NavLink
              to="/employee/my-expenses"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <Receipt size={20} />
              My Expenses
            </NavLink>

            <NavLink
              to="/employee/add-expense"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <PlusCircle size={20} />
              Add Expense
            </NavLink>
          </>
        )}

        {/* Admin */}

        {user.role === "admin" && (
          <>
            <NavLink
              to="/admin/expenses"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <Receipt size={20} />
              All Expenses
            </NavLink>

            <NavLink
              to="/admin/search"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <Search size={20} />
              Search
            </NavLink>
          </>
        )}

      </nav>

    </aside>
  );
}