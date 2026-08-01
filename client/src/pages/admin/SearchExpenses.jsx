import { useState } from "react";
import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function SearchExpenses() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [expenses, setExpenses] = useState([]);

  const searchExpenses = async () => {
    try {
      const res = await API.get("/expenses/search", {
        params: {
          title,
          category,
          status,
        },
      });

      setExpenses(res.data.expenses);

    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6">
          Search Expenses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          >

            <option value="">All Categories</option>

            <option>Travel</option>
            <option>Food</option>
            <option>Medical</option>
            <option>Office Supplies</option>
            <option>Accommodation</option>
            <option>Fuel</option>
            <option>Entertainment</option>
            <option>Other</option>

          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3"
          >

            <option value="">All Status</option>

            <option>Pending</option>

            <option>Approved</option>

            <option>Rejected</option>

          </select>

          <button
            onClick={searchExpenses}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Search
          </button>

        </div>

        <div className="overflow-x-auto mt-8">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-3 text-left">Employee</th>

                <th className="p-3 text-left">Title</th>

                <th className="p-3 text-left">Category</th>

                <th className="p-3 text-left">Amount</th>

                <th className="p-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    No Expenses Found
                  </td>

                </tr>

              ) : (

                expenses.map((expense) => (

                  <tr
                    key={expense._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {expense.employee.name}
                    </td>

                    <td className="p-3">
                      {expense.title}
                    </td>

                    <td className="p-3">
                      {expense.category}
                    </td>

                    <td className="p-3">
                      ₹{expense.amount}
                    </td>

                    <td className="p-3">

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