import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#63B3ED", "#48BB78", "#F6AD55", "#FC8181", "#9F7AEA"];

function CategoryPieChart({ transactions }) {
  const data = transactions.reduce((acc, transaction) => {
    if (!transaction.category || !transaction.amount) return acc; // Skip invalid data
    const existing = acc.find((item) => item.name === transaction.category);
    if (existing) {
      existing.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, []);
  if (data.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        No data available for the pie chart.
      </p>
    );
  }

  return (
    <div className="border border-gray-700 rounded p-6 bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Expenses by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#2D3748",
              border: "none",
              borderRadius: "8px",
              color: "#E2E8F0",
            }}
            itemStyle={{ color: "#E2E8F0" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;
