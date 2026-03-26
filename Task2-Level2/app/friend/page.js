"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const initialBoard = Array(9).fill(null);

export default function FriendGame() {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const router = useRouter();

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  useEffect(() => {
    if (winner || isDraw) {
      setCountdown(3);

      let timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            restart();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [winner, isDraw]);

  function handleClick(i) {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function restart() {
    setBoard(initialBoard);
    setIsXTurn(true);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 
                 bg-blue-600 text-white rounded-xl shadow-lg
                 hover:bg-blue-700 hover:scale-105 
                 transition duration-300 cursor-pointer"
      >
        <Home size={18} />
        Home
      </button>

      <h1 className="text-3xl mb-3">👥 FRIEND MODE</h1>

      <p className="mb-4">
        {winner
          ? `Winner: ${winner}`
          : isDraw
            ? "Draw!"
            : `Turn: ${isXTurn ? "X" : "O"}`}
      </p>

      {countdown && (
        <p className="text-xl text-yellow-400 mb-3">
          Restarting in {countdown}...
        </p>
      )}

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 bg-gray-800 text-3xl rounded-xl"
          >
            {cell}
          </button>
        ))}
      </div>
    </main>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
