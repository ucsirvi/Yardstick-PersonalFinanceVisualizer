import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BudgetComparisonChart({ budgets, transactions }) {
  const data = budgets.map((budget) => {
    const actual = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      category: budget.category,
      budget: budget.amount,
      actual,
    };
  });

  if (data.length === 0) {
    return <p>No data available for the budget comparison chart.</p>;
  }

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetComparisonChart;
