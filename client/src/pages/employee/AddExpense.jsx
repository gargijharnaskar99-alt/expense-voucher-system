import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function AddExpense() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("amount", form.amount);
      formData.append("date", form.date);
      formData.append("description", form.description);

      if (receipt) {
        formData.append("receipt", receipt);
      }

      await API.post("/expenses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Expense Added Successfully");

      navigate("/employee/my-expenses");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add expense");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Add New Expense
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block mb-2 font-medium">
                Expense Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Office Lunch"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option>Travel</option>
                  <option>Food</option>
                  <option>Office</option>
                  <option>Medical</option>
                  <option>Accommodation</option>
                  <option>Fuel</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Amount (₹)
                </label>

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 font-medium">
                Expense Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter expense details..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Upload Receipt
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              {loading ? "Submitting..." : "Submit Expense"}
            </button>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}