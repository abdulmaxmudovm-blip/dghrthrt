/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { WORD_LIST, WordEntry } from "../constants";
import { RefreshCcw, CheckCircle2, XCircle, Info, Rocket, Trophy, Play } from "lucide-react";

export default function WordGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [scrambled, setScrambled] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [streak, setStreak] = useState(0);

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const nextWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    const newWord = WORD_LIST[randomIndex];
    setCurrentWord(newWord);
    setScrambled(scrambleWord(newWord.word));
    setUserInput("");
    setFeedback(null);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setGameState("playing");
    nextWord();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState("gameover");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;

    if (userInput.toUpperCase() === currentWord.word) {
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => prev + 1);
      setFeedback("correct");
      setTimeout(() => {
        nextWord();
      }, 800);
    } else {
      setFeedback("incorrect");
      setStreak(0);
      setTimeout(() => {
        setFeedback(null);
      }, 800);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl px-6 py-12 mx-auto">
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-12"
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-2 h-2 bg-cyan-400" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-60">System.v4_Active</span>
            </div>
            <div className="flex flex-col items-center mb-12">
              <h1 className="text-[120px] md:text-[160px] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 uppercase">Cosmic</h1>
              <h1 className="text-[120px] md:text-[160px] font-black leading-[0.8] tracking-tighter text-white -mt-4 uppercase">Echo</h1>
            </div>
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-[1px] w-12 bg-white/20" />
              <p className="text-[10px] tracking-[0.8em] font-medium uppercase opacity-40 italic">Singularity Protocol Enabled</p>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            <button
              onClick={startGame}
              className="px-12 py-5 border-2 border-white/10 hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all font-black text-xs uppercase tracking-[0.5em] backdrop-blur-sm active:scale-95"
            >
              Begin Transmission
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-8"
          >
            {/* HUD */}
            <div className="flex justify-between items-end text-[10px] font-mono tracking-[0.2em] uppercase opacity-60">
              <div className="flex flex-col gap-2">
                <span className="opacity-30">Vessel Status / Score</span>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    <div className="h-4 w-1 bg-cyan-400" />
                    <div className="h-4 w-1 bg-cyan-400" />
                    <div className="h-4 w-1 bg-white/10" />
                  </div>
                  <span className="text-lg font-bold text-white tracking-widest">{score.toString().padStart(6, '0')}</span>
                </div>
              </div>
              
              <div className="text-center flex flex-col items-center gap-1">
                <span className="opacity-30">Time_Rem</span>
                <span className={`text-2xl font-black ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft.toString().padStart(2, '0')}s</span>
              </div>

              <div className="text-right flex flex-col gap-2">
                <span className="opacity-30">Streak.V4</span>
                <span className="text-lg font-bold text-cyan-400">{streak}X</span>
              </div>
            </div>

            {/* Word Display */}
            <div className="glass-panel p-16 relative border-white/5">
              <div className="absolute top-4 left-4 flex gap-1">
                <div className="w-1 h-1 bg-cyan-400/50" />
                <div className="w-1 h-1 bg-white/10" />
              </div>
              
              <div className="space-y-12">
                <div className="text-center">
                  <span className="text-[9px] font-mono uppercase tracking-[0.4em] opacity-30 block mb-6">Subject_Archive: {currentWord?.category}</span>
                  <div className="flex flex-wrap justify-center gap-4">
                    {scrambled.split("").map((char, index) => (
                      <motion.div
                        key={`${char}-${index}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="w-14 h-20 border-2 border-white/5 flex items-center justify-center text-5xl font-black tracking-tighter"
                      >
                        {char}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="h-px flex-1 bg-white/5" />
                  <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] italic max-w-md text-center">\"{currentWord?.hint}\"</p>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter Sequence..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={`w-full px-8 py-6 bg-white/5 border-2 text-center text-4xl font-black tracking-tighter transition-all outline-none uppercase ${
                      feedback === "correct" ? "border-green-500/50 bg-green-500/5 text-green-400" : 
                      feedback === "incorrect" ? "border-red-500/50 bg-red-500/5 text-red-400 shake" : 
                      "border-white/10 focus:border-cyan-400"
                    }`}
                  />
                  
                  <div className="grid grid-cols-4 gap-4">
                     <button
                      type="button"
                      onClick={nextWord}
                      className="p-4 border-2 border-white/5 hover:border-white/20 transition-colors flex items-center justify-center"
                      title="Skip"
                    >
                      <RefreshCcw className="w-5 h-5 opacity-40" />
                    </button>
                    <button
                      type="submit"
                      className="col-span-3 py-5 bg-white text-slate-950 font-black text-xs uppercase tracking-[0.4em] hover:bg-cyan-400 transition-all active:scale-95"
                    >
                      Execute_Validation
                    </button>
                  </div>
                </form>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className={`p-10 rounded-full backdrop-blur-md ${feedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {feedback === "correct" ? (
                        <CheckCircle2 className="w-16 h-16 text-green-400" />
                      ) : (
                        <XCircle className="w-16 h-16 text-red-400" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === "gameover" && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-16 glass-panel relative"
          >
            <div className="flex justify-center mb-10">
               <div className="w-16 h-16 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            
            <h2 className="text-[80px] font-black leading-none tracking-tighter uppercase mb-2">Final</h2>
            <h2 className="text-[80px] font-black leading-none tracking-tighter uppercase mb-6 opacity-30">Status</h2>
            
            <div className="grid grid-cols-2 gap-px bg-white/10 mb-12">
              <div className="p-8 bg-slate-950">
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">Total Score</div>
                <div className="text-3xl font-black tracking-tighter text-cyan-400">{score}</div>
              </div>
              <div className="p-8 bg-slate-950">
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">Words Found</div>
                <div className="text-3xl font-black tracking-tighter">{Math.floor(score / 10)}</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-5 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all font-black text-xs uppercase tracking-[0.5em] active:scale-95"
            >
              Restart_Sequence
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
