import React, { useState } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [transactions, setTransactions] = useState([]);


  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };


  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">

        <TransactionForm onAdd={handleAddTransaction} />


        <Dashboard transactions={transactions} />


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
