"use client";

import { User, Bot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-3xl w-full">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
          XO Game
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Choose your game mode and start playing
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Friend Mode */}
          <div
            onClick={() => router.push("/friend")}
            className="group cursor-pointer bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                <User size={40} className="text-blue-400" />
              </div>

              <h2 className="text-xl font-semibold text-white mb-2">
                Play with Friend
              </h2>
              <p className="text-gray-400 text-sm">
                Challenge your friend on the same device
              </p>
            </div>
          </div>

          {/* Computer Mode */}
          <div
            onClick={() => router.push("/computer")}
            className="group cursor-pointer bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="bg-purple-500/10 p-4 rounded-full mb-4 group-hover:scale-110 transition">
                <Bot size={40} className="text-purple-400" />
              </div>

              <h2 className="text-xl font-semibold text-white mb-2">
                Play with Computer
              </h2>
              <p className="text-gray-400 text-sm">
                Test your skills against AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
