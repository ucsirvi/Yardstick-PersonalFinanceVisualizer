import React, { useState } from "react";

function TransactionEditForm({ transaction, onUpdate, onCancel }) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date.split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...transaction, description, amount, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-100">Edit Transaction</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
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
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-300 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default TransactionEditForm;
