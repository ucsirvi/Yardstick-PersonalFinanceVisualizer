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
        console.log("Fetched Transactions:", data); // Debug log
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

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/budgets`
        );
        console.log("Fetched Budgets:", data); // Debug log
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  console.log("Transactions:", transactionList); // Debug log

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = async (updatedTransaction) => {
    console.log("Updating Transaction:", updatedTransaction); // Debug log
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/transactions/${
        updatedTransaction._id
      }`;
      console.log("PUT Request URL:", url); // Debug log
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
      console.error("Error updating transaction:", error); // Debug log
      setError("Failed to update transaction.");
    }
  };

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
      console.error("Error deleting transaction:", error); // Debug log
      setError("Failed to delete transaction.");
    }
  };

  // Calculate spending insights
  const spendingInsights = budgets.map((budget) => {
    const actualSpending = transactionList
      .filter((transaction) => transaction.category === budget.category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const difference = budget.amount - actualSpending;
    return {
      category: budget.category,
      status: difference >= 0 ? "Under Budget" : "Over Budget",
      difference: Math.abs(difference),
    };
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {error && <ErrorState message={error} />}

      {/* Spending Insights */}
      <div className="border rounded p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
        {spendingInsights.length > 0 ? (
          <ul>
            {spendingInsights.map((insight) => (
              <li
                key={insight.category}
                className={`flex justify-between py-2 border-b last:border-none ${
                  insight.status === "Over Budget"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <span>{insight.category}</span>
                <span>
                  {insight.status}: ${insight.difference}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No spending insights available.</p>
        )}
      </div>

      {/* Transaction List */}
      <ul className="border rounded p-4 bg-white shadow">
        {transactionList.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between py-2 border-b last:border-none"
          >
            <span>{transaction.date.split("T")[0]}</span>
            <span>{transaction.description}</span>
            <span className="font-semibold">${transaction.amount}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(transaction)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

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
