const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Expense Voucher API Running 🚀");
});

// Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});