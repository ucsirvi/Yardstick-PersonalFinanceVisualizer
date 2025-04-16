import React, { useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Function to handle adding a new transaction
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  // // Function to handle updating an existing transaction
  // const handleUpdateTransaction = (updatedTransaction) => {
  //   setTransactions((prev) =>
  //     prev.map((transaction) =>
  //       transaction._id === updatedTransaction._id
  //         ? updatedTransaction
  //         : transaction
  //     )
  //   );
  // };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Transaction Form */}
        <TransactionForm onAdd={handleAddTransaction} />

        {/* Dashboard */}
        <Dashboard transactions={transactions} />

        {/* Transaction List */}
        <TransactionList
          onUpdate={(updatedTransaction) => {
            console.log("Transaction Updated in App:", updatedTransaction); // Debug log
            setTransactions((prev) =>
              prev.map((transaction) =>
                transaction._id === updatedTransaction._id
                  ? updatedTransaction
                  : transaction
              )
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
