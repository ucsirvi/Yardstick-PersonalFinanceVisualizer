import React, { useState } from "react";
import axios from "axios";

function BudgetForm({ onBudgetUpdate }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const categories = [
    "Food",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/budgets`,
        { category, amount }
      );
      onBudgetUpdate(data);
      setAmount("");
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-gray-800 text-gray-100">
            {cat}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Set Budget
      </button>
    </form>
  );
}

export default BudgetForm;
