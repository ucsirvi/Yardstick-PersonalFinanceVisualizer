
const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middleware/errorHandler");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
