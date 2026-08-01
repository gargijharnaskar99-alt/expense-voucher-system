import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import AllExpenses from "../pages/admin/AllExpenses";

// Employee
import EmployeeDashboard from "../pages/employee/Dashboard";
import MyExpenses from "../pages/employee/MyExpenses";
import AddExpense from "../pages/employee/AddExpense";
import EditExpense from "../pages/employee/EditExpense";

// Shared
import ExpenseDetails from "../pages/ExpenseDetails";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= Public Routes ================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= Employee Routes ================= */}

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/my-expenses"
          element={
            <ProtectedRoute role="employee">
              <MyExpenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/add-expense"
          element={
            <ProtectedRoute role="employee">
              <AddExpense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/edit-expense/:id"
          element={
            <ProtectedRoute role="employee">
              <EditExpense />
            </ProtectedRoute>
          }
        />

        {/* ================= Admin Routes ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/expenses"
          element={
            <ProtectedRoute role="admin">
              <AllExpenses />
            </ProtectedRoute>
          }
        />

        {/* ================= Shared Routes ================= */}

        <Route
          path="/expense/:id"
          element={
            <ProtectedRoute>
              <ExpenseDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}