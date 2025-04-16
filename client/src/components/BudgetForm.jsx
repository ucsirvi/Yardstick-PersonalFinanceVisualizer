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
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/budgets`, { category, amount });
      onBudgetUpdate(data);
      setAmount("");
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Set Budget
      </button>
    </form>
  );
}

export default BudgetForm;
