import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpense();
  }, []);

  const loadExpense = async () => {
    try {
      const res = await API.get(`/expenses/${id}`);
      setExpense(res.data.expense);
    } catch (error) {
      console.log(error);
      alert("Unable to load expense");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-xl mt-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Expense Details
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            Back
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <Info title="Employee">
            {expense.employee?.name}
          </Info>

          <Info title="Email">
            {expense.employee?.email}
          </Info>

          <Info title="Title">
            {expense.title}
          </Info>

          <Info title="Category">
            {expense.category}
          </Info>

          <Info title="Amount">
            ₹{expense.amount}
          </Info>

          <Info title="Expense Date">
            {new Date(expense.expenseDate).toLocaleDateString()}
          </Info>

          <Info title="Status">
            <span
              className={`px-3 py-1 rounded-full text-white
              ${
                expense.status === "Approved"
                  ? "bg-green-600"
                  : expense.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {expense.status}
            </span>
          </Info>

          <Info title="Remarks">
            {expense.remarks || "No Remarks"}
          </Info>

        </div>

        <div className="mt-8">

          <h3 className="font-bold text-lg mb-2">
            Description
          </h3>

          <div className="border rounded-lg p-4 bg-gray-50">
            {expense.description || "No Description"}
          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold text-lg mb-3">
            Receipt
          </h3>

          {expense.receipt ? (

            <a
              href={`http://localhost:5000/uploads/${expense.receipt}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Uploaded Receipt
            </a>

          ) : (

            <p className="text-gray-500">
              No Receipt Uploaded
            </p>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

function Info({ title, children }) {
  return (
    <div>

      <p className="text-gray-500 mb-1">
        {title}
      </p>

      <div className="font-semibold text-lg">
        {children}
      </div>

    </div>
  );
}