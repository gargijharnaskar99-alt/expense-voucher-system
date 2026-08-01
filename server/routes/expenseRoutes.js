const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
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
} = require("../controllers/expenseController");

router.post("/", protect, createExpense);

router.get("/", protect, getMyExpenses);

router.get("/all", protect, getAllExpenses);

router.get("/search", protect, searchExpenses);

router.get("/dashboard", protect, getDashboardStats);

router.get("/:id", protect, getExpenseById);

router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

router.patch("/:id/approve", protect, approveExpense);

router.patch("/:id/reject", protect, rejectExpense);

router.patch(
  "/:id/upload",
  protect,
  upload.single("receipt"),
  uploadReceipt
);

module.exports = router;