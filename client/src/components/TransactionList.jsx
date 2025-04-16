import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionEditForm from "./TransactionEditForm";
import ErrorState from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";

function TransactionList({ onUpdate }) {
  const [transactionList, setTransactionList] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/transactions`
        );
        setTransactionList(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Fetch budgets from the backend
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/budgets`
        );
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  // Handle editing a transaction
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Handle updating a transaction
  const handleUpdate = async (updatedTransaction) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/transactions/${
        updatedTransaction._id
      }`;
      const { data } = await axios.put(url, updatedTransaction);

      setTransactionList((prev) =>
        prev.map((transaction) =>
          transaction._id === data._id ? data : transaction
        )
      );
      onUpdate(data);
      setEditingTransaction(null);
      setError(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
      setError("Failed to update transaction.");
    }
  };

  // Handle deleting a transaction
  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/transactions/${transactionId}`
      );
      setTransactionList((prev) =>
        prev.filter((transaction) => transaction._id !== transactionId)
      );
      setError(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Failed to delete transaction.");
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Error State */}
      {error && <ErrorState message={error} />}

      {/* Transaction List */}
      <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-md">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Transaction List
        </h2>
        <ul>
          {transactionList.map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center py-3 border-b border-gray-700 last:border-none text-gray-300"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">
                  {transaction.date.split("T")[0]}
                </span>
                <span className="font-medium">{transaction.description}</span>
              </div>
              <span className="font-semibold text-gray-100">
                ${transaction.amount}
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="text-blue-400 hover:text-blue-500 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="text-red-400 hover:text-red-500 font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Form */}
      {editingTransaction && (
        <TransactionEditForm
          transaction={editingTransaction}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}

export default TransactionList;
