const Budget = require("../models/Budget");

// GET /api/budgets - Fetch all budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/budgets - Add a new budget
const addBudget = async (req, res) => {
  const { category, amount } = req.body;

  try {
    const budget = new Budget({ category, amount });
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBudgets, addBudget };
