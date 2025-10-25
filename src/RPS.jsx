import React, { useState, useEffect } from "react";

export default function RPS() {
  const choices = ["rock", "paper", "scissors"];
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [compChoice, setCompChoice] = useState("");
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  // Main play function
  const play = (choice) => {
    if (gameOver) return;
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setCompChoice(compChoice);

    if (choice === compChoice) setResult("Draw");
    else if (
      (choice === "rock" && compChoice === "scissors") ||
      (choice === "paper" && compChoice === "rock") ||
      (choice === "scissors" && compChoice === "paper")
    ) {
      setResult("You Win!");
      setUserScore((prev) => prev + 1);
    } else {
      setResult("You Lose!");
      setCompScore((prev) => prev + 1);
    }

    // Restart round timer
    setTimeLeft(10);
  };

  // Check game end
  useEffect(() => {
    if (userScore === 3 || compScore === 3) setGameOver(true);
  }, [userScore, compScore]);

  const resetGame = () => {
    setUserScore(0);
    setCompScore(0);
    setUserChoice("");
    setCompChoice("");
    setResult("");
    setTimeLeft(10);
    setGameOver(false);
  };

  const getEmoji = (choice) =>
    choice === "rock" ? "✊" : choice === "paper" ? "✋" : "✌️";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 transition-colors duration-500
        ${
          result === "You Win!"
            ? "bg-green-200"
            : result === "You Lose!"
            ? "bg-red-200"
            : "bg-yellow-200"
        }`}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        🪨 Rock 📜 Paper ✂️ Scissors
      </h1>

      <div className="text-lg sm:text-xl mb-2">
        ⏳ Time Left: <span className="font-semibold">{timeLeft}s</span>
      </div>

      <p className="text-lg sm:text-xl mb-6">
        Score — <span className="font-semibold">You:</span> {userScore} |{" "}
        <span className="font-semibold">Computer:</span> {compScore}
      </p>

      {/* Choice Buttons */}
      <div className="flex gap-6 sm:gap-10 mb-6 flex-wrap justify-center">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => play(c)}
            disabled={gameOver || timeLeft <= 0}
            className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl sm:text-5xl
              bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 active:scale-95
              transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {getEmoji(c)}
          </button>
        ))}
      </div>

      {/* Result Section */}
      {result && (
        <div className="mb-4 text-lg sm:text-xl">
          <p>Your Choice: {getEmoji(userChoice)}</p>
          <p>Computer’s Choice: {getEmoji(compChoice)}</p>
          <p className="font-bold mt-2">{result}</p>
        </div>
      )}

      {/* Game Over */}
      {(gameOver || timeLeft <= 0) && (
        <div className="text-center mt-4">
          <h2 className="text-xl sm:text-2xl mb-2 font-semibold">
            {userScore === 3
              ? "🎉 You won the game!"
              : compScore === 3
              ? "💻 Computer won the game!"
              : "⏰ Time's up!"}
          </h2>
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
