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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
