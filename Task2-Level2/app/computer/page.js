"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const initialBoard = Array(9).fill(null);

export default function ComputerGame() {
  const [board, setBoard] = useState(initialBoard);
  const [level, setLevel] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const router = useRouter();

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((c) => c !== null);

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
    if (board[i] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[i] = "X";

    setBoard(newBoard);
    setIsPlayerTurn(false);

    setTimeout(() => computerMove(newBoard), 400);
  }

  function computerMove(currentBoard) {
    let move;

    if (level === "easy") {
      move = randomMove(currentBoard);
    } else if (level === "moderate") {
      move =
        Math.random() < 0.5 ? bestMove(currentBoard) : randomMove(currentBoard);
    } else {
      move = bestMove(currentBoard);
    }

    if (move !== null) {
      currentBoard[move] = "O";
      setBoard([...currentBoard]);
      setIsPlayerTurn(true);
    }
  }

  function restart() {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
  }

  // ===== UI =====
  if (!level) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-6">Select Difficulty</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setLevel("easy")}
            className="bg-green-600 px-6 py-2 rounded-xl cursor-pointer hover:scale-105 hover:-translate-y-1"
          >
            Easy
          </button>
          <button
            onClick={() => setLevel("moderate")}
            className="bg-yellow-500 px-6 py-2 rounded-xl cursor-pointer hover:scale-105 hover:-translate-y-1"
          >
            Moderate
          </button>
          <button
            onClick={() => setLevel("hard")}
            className="bg-red-600 px-6 py-2 rounded-xl cursor-pointer hover:scale-105 hover:-translate-y-1"
          >
            Hard
          </button>
        </div>
      </main>
    );
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

      <h1 className="text-3xl mb-3">🤖 {level.toUpperCase()}</h1>

      <p className="mb-3">
        {winner
          ? `Winner: ${winner}`
          : isDraw
            ? "Draw!"
            : isPlayerTurn
              ? "Your Turn"
              : "Computer..."}
      </p>

      {countdown && (
        <p className="text-yellow-400 mb-2">Restarting in {countdown}...</p>
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

// ===== AI =====

function randomMove(board) {
  const empty = board
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
}

function bestMove(board) {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(board, depth, isMaximizing) {
  const winner = calculateWinner(board);

  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every((c) => c !== null)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
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
