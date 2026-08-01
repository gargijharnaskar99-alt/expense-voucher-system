import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

export default function AddExpense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    description: "",
    expenseDate: "",
  });

  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post(
        "/expenses",
        formData
      );

      // Upload receipt after expense creation
      if (receipt) {
        const fileData = new FormData();

        fileData.append("receipt", receipt);

        await API.patch(
          `/expenses/${res.data.expense._id}/upload`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Expense Created Successfully");

      navigate("/employee/my-expenses");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create expense"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add New Expense
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Category
            </option>

            <option>Travel</option>

            <option>Food</option>

            <option>Accommodation</option>

            <option>Medical</option>

            <option>Office Supplies</option>

            <option>Entertainment</option>

            <option>Other</option>

          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) =>
              setReceipt(e.target.files[0])
            }
            className="w-full"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Create Expense"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}