const Expense = require("../models/Expense");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const {
      title,
      category,
      amount,
      description,
      expenseDate,
    } = req.body;

    const expense = await Expense.create({
      employee: req.user.id,
      title,
      category,
      amount,
      description,
      expenseDate,
    });

    res.status(201).json({
      success: true,
      message: "Expense Created Successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Logged-in User Expenses
const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      employee: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Check owner
    if (expense.employee.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Only pending expenses can be updated
    if (expense.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only Pending Expenses can be updated",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense: updatedExpense,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Check owner
    if (expense.employee.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Only pending expenses can be deleted
    if (expense.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only Pending Expenses can be deleted",
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Expenses (Admin)
const getAllExpenses = async (req, res) => {
  try {
    // Allow only admins
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin Only",
      });
    }

    const expenses = await Expense.find()
      .populate("employee", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Approve Expense (Admin)
const approveExpense = async (req, res) => {
  try {
    // Allow only admins
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin Only",
      });
    }

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    expense.status = "Approved";
    expense.remarks = req.body.remarks || "Approved by Admin";

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense Approved Successfully",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Reject Expense (Admin)
const rejectExpense = async (req, res) => {
  try {

    // Allow only admins
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin Only",
      });
    }

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    expense.status = "Rejected";
    expense.remarks = req.body.remarks || "Rejected by Admin";

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense Rejected Successfully",
      expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get Expense By ID
const getExpenseById = async (req, res) => {
  try {

    const expense = await Expense.findById(req.params.id)
      .populate("employee", "name email role");

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    // Employee can only view their own expense
    if (
      req.user.role !== "admin" &&
      expense.employee._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Upload Receipt
const uploadReceipt = async (req, res) => {
  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Employee can upload only his own receipt
    if (
      expense.employee.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    expense.receipt = req.file.filename;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Receipt Uploaded Successfully",
      receipt: req.file.filename,
      expense,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const searchExpenses = async (req, res) => {
  try {
    const { title, category, status } = req.query;

    let query = {};

    // Employee sees only their expenses
    if (req.user.role !== "admin") {
      query.employee = req.user.id;
    }

    if (title) {
      query.title = {
        $regex: title,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const expenses = await Expense.find(query)
      .populate("employee", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {

    let query = {};

    // Employee sees only their own statistics
    if (req.user.role !== "admin") {
      query.employee = req.user.id;
    }

    // Fetch expenses
    const expenses = await Expense.find(query);

    // Total Expenses
    const totalExpenses = expenses.length;

    // Status Counts
    const pending = expenses.filter(
      expense => expense.status === "Pending"
    ).length;

    const approved = expenses.filter(
      expense => expense.status === "Approved"
    ).length;

    const rejected = expenses.filter(
      expense => expense.status === "Rejected"
    ).length;

    // Total Amount
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    res.status(200).json({
      success: true,
      statistics: {
        totalExpenses,
        pending,
        approved,
        rejected,
        totalAmount,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  createExpense,
  getMyExpenses,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  approveExpense,
  rejectExpense,
  getExpenseById,
  uploadReceipt,
  searchExpenses,
  getDashboardStats,
};