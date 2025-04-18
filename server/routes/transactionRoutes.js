const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");


router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
