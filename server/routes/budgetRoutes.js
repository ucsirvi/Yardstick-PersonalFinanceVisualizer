// filepath: /server/routes/budgetRoutes.js
const express = require("express");
const { getBudgets, addBudget } = require("../controllers/budgetController");

const router = express.Router();

// GET /api/budgets - Fetch all budgets
router.get("/", getBudgets);

// POST /api/budgets - Add a new budget
router.post("/", addBudget);

module.exports = router;
