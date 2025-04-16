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
    return (
      <p className="text-gray-400 text-center">
        No data available for the budget comparison chart.
      </p>
    );
  }

  return (
    <div className="border border-gray-700 rounded p-4 bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Budget vs Actual
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="category" stroke="#E2E8F0" />
          <YAxis stroke="#E2E8F0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              border: "none",
              borderRadius: "8px",
              color: "#E2E8F0",
            }}
            itemStyle={{ color: "#E2E8F0" }}
          />
          <Bar dataKey="budget" fill="#63B3ED" />
          <Bar dataKey="actual" fill="#48BB78" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetComparisonChart;
