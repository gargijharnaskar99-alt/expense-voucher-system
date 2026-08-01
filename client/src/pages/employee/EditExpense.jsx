import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

export default function EditExpense() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    description: "",
    expenseDate: "",
  });

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {

    try {

      const res = await API.get(`/expenses/${id}`);

      setFormData({
        title: res.data.expense.title,
        category: res.data.expense.category,
        amount: res.data.expense.amount,
        description: res.data.expense.description,
        expenseDate:
          res.data.expense.expenseDate.substring(0,10),
      });

    } catch (error) {

      alert("Unable to load expense");

    }

  };

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

      await API.put(
        `/expenses/${id}`,
        formData
      );

      alert("Expense Updated Successfully");

      navigate("/employee/my-expenses");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Expense
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

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
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="date"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Expense"}
          </button>

        </form>

      </div>

    </DashboardLayout>

  );

}