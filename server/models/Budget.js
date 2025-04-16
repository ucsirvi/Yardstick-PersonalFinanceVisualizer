const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
