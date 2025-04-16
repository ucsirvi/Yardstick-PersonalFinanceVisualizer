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
      className="space-y-4 border p-4 bg-white shadow"
    >
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
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
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="text-gray-500">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </div>
    </form>
  );
}

export default TransactionEditForm;
