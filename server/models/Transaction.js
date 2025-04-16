const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true }, // New field for category
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
