import React, { useState } from "react";
import axios from "axios";

const categories = [
  "Food",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Other",
]; // Predefined categories

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]); // Default category

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { description, amount, date, category };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/transactions`,
        newTransaction
      );
      onAdd(data);
      setDescription("");
      setAmount("");
      setDate("");
      setCategory(categories[0]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-100">Add Transaction</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-gray-800 text-gray-100">
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
