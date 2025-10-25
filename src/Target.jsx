import React, { useState, useEffect } from "react";

export default function TargetPractice() {
  const [score, setScore] = useState(0);
  const [totalTargets, setTotalTargets] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [target, setTarget] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      setTarget(null);
      return;
    }
    if (!gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameOver]);

  // Target spawn logic
  useEffect(() => {
    if (gameOver) return;

    const spawnTime = Math.random() * 200 + 800; // 0.8s - 1s
    const spawn = setTimeout(() => {
      const x = Math.random() * 85; // stay within boundaries
      const y = Math.random() * 85;
      setTarget({ x, y });
      setTotalTargets((prev) => prev + 1);

      const remove = setTimeout(() => setTarget(null), 800);
      return () => clearTimeout(remove);
    }, spawnTime);

    return () => clearTimeout(spawn);
  }, [totalTargets, gameOver]);

  // Click on target
  const handleClickTarget = () => {
    setScore((prev) => prev + 1);
    setTarget(null);
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setTotalTargets(0);
    setTimeLeft(30);
    setTarget(null);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl sm:text-3xl mb-4 font-semibold text-purple-700">
        🎯 Target Practice
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 text-gray-700">
        <p>⏰ Time Left: {timeLeft}s</p>
        <p>🏹 Score: {score}</p>
      </div>

      {totalTargets > 0 && (
        <p className="mb-4 text-sm sm:text-base text-gray-600">
          Accuracy: {((score / totalTargets) * 100).toFixed(1)}%
        </p>
      )}

      {/* Game area */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-white border border-gray-300 rounded-lg shadow-inner overflow-hidden">
        {target && (
          <div
            onClick={handleClickTarget}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full cursor-pointer transition-transform duration-150 hover:scale-110"
            style={{
              top: `${target.y}%`,
              left: `${target.x}%`,
            }}
          ></div>
        )}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="mt-4 text-center">
          <h2 className="text-xl mb-2 text-red-600 font-bold">⏰ Game Over!</h2>
          <p>Final Score: {score}</p>
          <p>Final Accuracy: {((score / totalTargets) * 100).toFixed(1)}%</p>
          <button
            onClick={resetGame}
            className="mt-3 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </div>
  );
}
