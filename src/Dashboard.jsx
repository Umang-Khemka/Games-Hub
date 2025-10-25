import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">
        🎮 Game Hub Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md text-center">
        <Link
          to="/rps"
          className="px-6 py-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          🪨 Rock Paper Scissors
        </Link>

        <Link
          to="/target"
          className="px-6 py-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          🎯 Target Practice
        </Link>

        <Link
          to="/memory"
          className="px-6 py-4 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          🧠 Memory Flip Game
        </Link>
      </div>
    </div>
  );
}
