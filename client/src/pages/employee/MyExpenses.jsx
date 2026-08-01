import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

export default function MyExpenses() {

  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {

    try {

      const res = await API.get("/expenses");

      setExpenses(res.data.expenses || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const deleteExpense = async (id) => {

    if (!window.confirm("Delete this expense?"))
      return;

    try {

      await API.delete(`/expenses/${id}`);

      alert("Expense Deleted Successfully");

      loadExpenses();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      expense.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <DashboardLayout>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">

            My Expenses

          </h1>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2 w-72"
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Receipt
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-8"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredExpenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    No Expenses Found
                  </td>

                </tr>

              ) : (

                filteredExpenses.map((expense) => (

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

                    <td className="p-4">
                      ₹{expense.amount}
                    </td>

                    <td className="p-4">
                      {new Date(
                        expense.expenseDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          expense.status ===
                          "Approved"
                            ? "bg-green-100 text-green-700"
                            : expense.status ===
                              "Rejected"
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
                          className="text-blue-600 underline"
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

                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() =>
                            navigate(
                              `/employee/edit-expense/${expense._id}`
                            )
                          }
                          disabled={
                            expense.status !==
                            "Pending"
                          }
                          className={`px-4 py-2 rounded-lg text-white ${
                            expense.status ===
                            "Pending"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteExpense(
                              expense._id
                            )
                          }
                          disabled={
                            expense.status !==
                            "Pending"
                          }
                          className={`px-4 py-2 rounded-lg text-white ${
                            expense.status ===
                            "Pending"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}