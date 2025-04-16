import React, { useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={handleAddTransaction} />
      <Dashboard transactions={transactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
