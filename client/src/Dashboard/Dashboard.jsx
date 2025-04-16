import React, { useEffect, useState } from "react";
import CategoryPieChart from "../Charts/CategoryPieChart";
import BudgetComparisonChart from "../Charts/BudgetComparisonChart";
import MonthlyExpensesChart from "../Charts/MonthlyExpensesChart";
import axios from "axios";

function Dashboard({ transactions }) {
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets from the backend
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/budgets`);
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
  
    fetchBudgets();
  }, []);

  const totalExpenses = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Calculate spending insights
  const spendingInsights = budgets.map((budget) => {
    const actualSpending = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const difference = budget.amount - actualSpending;
    return {
      category: budget.category,
      status: difference >= 0 ? "Under Budget" : "Over Budget",
      difference: Math.abs(difference),
    };
  });

  if (spendingInsights.length === 0) {
    return <p>No spending insights available.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <p className="text-2xl font-bold">${totalExpenses}</p>
        </div>
        <div className="col-span-2">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Monthly Expenses Chart */}
      <MonthlyExpensesChart transactions={transactions} />

      {/* Budget vs Actual Comparison */}
      <div className="border rounded p-4 bg-white shadow">
        <BudgetComparisonChart budgets={budgets} transactions={transactions} />
      </div>

      {/* Spending Insights */}
      <div className="border rounded p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
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
      </div>

      {/* Recent Transactions */}
      <div className="border rounded p-4 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <ul>
          {transactions
            .slice(-5)
            .reverse()
            .map((transaction) => (
              <li
                key={transaction._id}
                className="flex justify-between py-2 border-b last:border-none"
              >
                <span>{transaction.date.split("T")[0]}</span>
                <span>{transaction.description}</span>
                <span className="font-semibold">${transaction.amount}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
