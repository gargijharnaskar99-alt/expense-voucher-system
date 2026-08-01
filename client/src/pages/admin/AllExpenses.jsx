import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/expenses/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data.expenses);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch expenses");
    }
  };

  // Approve Expense
  const approveExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/expenses/${id}/approve`,
        {
          remarks: "Approved by Admin",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Expense Approved Successfully");

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Unable to approve expense");
    }
  };

  // Reject Expense
  const rejectExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/expenses/${id}/reject`,
        {
          remarks: "Rejected by Admin",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Expense Rejected Successfully");

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Unable to reject expense");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Heading */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            All Expenses
          </h1>

          <button
            onClick={fetchExpenses}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            Refresh
          </button>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">Employee</th>

                <th className="px-6 py-4 text-left">Title</th>

                <th className="px-6 py-4 text-left">Category</th>

                <th className="px-6 py-4 text-left">Amount</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500"
                  >
                    No Expenses Found
                  </td>

                </tr>

              ) : (

                expenses.map((expense) => (

                  <tr
                    key={expense._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-medium">
                      {expense.employee.name}
                    </td>

                    <td className="px-6 py-4">
                      {expense.title}
                    </td>

                    <td className="px-6 py-4">
                      {expense.category}
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      ₹{expense.amount}
                    </td>

                    <td className="px-6 py-4">

                      {expense.status === "Pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Pending
                        </span>
                      )}

                      {expense.status === "Approved" && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Approved
                        </span>
                      )}

                      {expense.status === "Rejected" && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Rejected
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() => approveExpense(expense._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-3"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectExpense(expense._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

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

export default AllExpenses;