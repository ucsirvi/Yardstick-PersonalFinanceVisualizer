
const Transaction = require("../models/Transaction");


const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addTransaction = async (req, res) => {
  const { description, amount, date, category } = req.body;

  try {
    const transaction = new Transaction({
      description,
      amount,
      date,
      category,
    });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const mongoose = require("mongoose");

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;


    console.log("Transaction ID to delete:", id);


    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid transaction ID:", id);
      return res.status(400).json({ message: "Invalid transaction ID" });
    }


    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      console.error("Transaction not found:", id);
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log("Transaction deleted successfully:", id);
    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error); 
    res.status(500).json({ message: "Failed to delete transaction." });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, category } = req.body;

    console.log("Transaction ID to update:", id);
    console.log("Request Body:", req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid transaction ID:", id);
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      console.error("Transaction not found:", id);
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (description) transaction.description = description;
    if (amount) transaction.amount = amount;
    if (date) transaction.date = date;
    if (category) transaction.category = category;

    const updatedTransaction = await transaction.save();
    console.log("Transaction updated successfully:", updatedTransaction);

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction." });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
