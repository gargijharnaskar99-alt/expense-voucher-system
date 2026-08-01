const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Travel",
        "Food",
        "Accommodation",
        "Office Supplies",
        "Medical",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      default: "",
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    receipt: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);