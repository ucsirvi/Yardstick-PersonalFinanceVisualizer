import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:underline hover:text-blue-400">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-blue-400">
              Transactions
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline hover:text-blue-400">
              Budgets
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
