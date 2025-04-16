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

function MonthlyExpensesChart({ transactions }) {
  const data = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.expenses += transaction.amount;
    } else {
      acc.push({ month, expenses: transaction.amount });
    }
    return acc;
  }, []);

  return (
    <div className="border border-gray-700 rounded p-4 bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Monthly Expenses
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="month" stroke="#E2E8F0" />
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
          <Bar dataKey="expenses" fill="#63B3ED" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyExpensesChart;
