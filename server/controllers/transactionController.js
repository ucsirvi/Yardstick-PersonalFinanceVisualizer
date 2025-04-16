// filepath: /server/controllers/transactionController.js
const Transaction = require("../models/Transaction");

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new transaction
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

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.remove();
    res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction." });
  }
};

// filepath: /server/controllers/transactionController.js
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Ensure this matches the route parameter
    const { description, amount, date, category } = req.body;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.description = description || transaction.description;
    transaction.amount = amount || transaction.amount;
    transaction.date = date || transaction.date;
    transaction.category = category || transaction.category;

    const updatedTransaction = await transaction.save();
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
