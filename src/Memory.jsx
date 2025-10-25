import React, { useEffect, useState } from "react";

export default function Memory() {
  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍑", "🍍", "🥝", "🍉"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const doubled = [...emojis, ...emojis];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const doubled = [...emojis, ...emojis];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        🧠 Memory Card Flip Game
      </h1>
      <p className="mb-4 text-lg md:text-xl">Moves: {moves}</p>

      <div
        className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
      >
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`
                flex items-center justify-center text-3xl md:text-4xl 
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                rounded-xl shadow-md cursor-pointer select-none
                transition-all duration-300
                ${isFlipped ? "bg-white scale-105" : "bg-blue-500 hover:bg-blue-600"}
              `}
            >
              {isFlipped ? card : ""}
            </div>
          );
        })}
      </div>

      {matched.length === cards.length && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">🎉 You won!</h2>
          <p className="text-lg mb-3">Total Moves: {moves}</p>
          <button
            onClick={resetGame}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
