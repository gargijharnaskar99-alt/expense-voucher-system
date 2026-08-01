import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

export default function MyExpenses() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    const filtered = expenses.filter(
      (expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredExpenses(filtered);
  }, [search, expenses]);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/expenses");

      setExpenses(res.data.expenses);
      setFilteredExpenses(res.data.expenses);
    } catch (error) {
      toast.error("Unable to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await API.delete(`/expenses/${id}`);

      toast.success("Expense Deleted Successfully");

      loadExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading Expenses..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <PageHeader
        title="My Expenses"
        subtitle="Manage all your submitted expenses."
      >
        <Button
          color="blue"
          onClick={loadExpenses}
        >
          Refresh
        </Button>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <input
            type="text"
            placeholder="Search Expense..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-3 w-80"
          />

          <Button
            color="green"
            onClick={() =>
              navigate("/employee/add-expense")
            }
          >
            + Add Expense
          </Button>

        </div>

        {filteredExpenses.length === 0 ? (
          <EmptyState
            title="No Expenses Found"
            subtitle="Start by adding your first expense."
          />
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800 text-white">

                <tr>

                  <th className="p-4 text-left">Title</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Amount</th>

                  <th className="p-4 text-left">Date</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Receipt</th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredExpenses.map((expense) => (

                  <tr
                    key={expense._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {expense.title}
                    </td>

                    <td className="p-4">
                      {expense.category}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{expense.amount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          expense.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : expense.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {expense.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {expense.receipt ? (

                        <a
                          href={`http://localhost:5000/uploads/${expense.receipt}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>

                      ) : (

                        <span className="text-gray-400">
                          No Receipt
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <Button
                          color="gray"
                          onClick={() =>
                            navigate(`/expense/${expense._id}`)
                          }
                        >
                          View
                        </Button>

                        <Button
                          color="blue"
                          onClick={() =>
                            navigate(
                              `/employee/edit-expense/${expense._id}`
                            )
                          }
                          disabled={
                            expense.status !== "Pending"
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          color="red"
                          onClick={() =>
                            deleteExpense(expense._id)
                          }
                          disabled={
                            expense.status !== "Pending"
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}