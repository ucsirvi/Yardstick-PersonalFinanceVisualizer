
const express = require("express");
const { getBudgets, addBudget } = require("../controllers/budgetController");

const router = express.Router();


router.get("/", getBudgets);


router.post("/", addBudget);

module.exports = router;
