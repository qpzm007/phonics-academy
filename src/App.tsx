import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Layers, Award, Trophy, BarChart2, Star, CheckCircle, Sparkles } from 'lucide-react';
import { PhonicsWord } from './types';
import PhonicsBoard from './components/PhonicsBoard';
import Flashcards from './components/Flashcards';
import QuizView from './components/QuizView';
import SpellingGame from './components/SpellingGame';
import ProgressTracker from './components/ProgressTracker';

type ActiveTab = 'board' | 'flashcards' | 'quiz' | 'game' | 'progress';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('board');
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [starredWords, setStarredWords] = useState<string[]>([]);
  const [spellingHighScore, setSpellingHighScore] = useState<number>(0);
  const [quizScores, setQuizScores] = useState<{
    date: string;
    score: number;
    total: number;
    category: string;
  }[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem('phonics_completed');
      if (savedCompleted) setCompletedWords(JSON.parse(savedCompleted));

      const savedStarred = localStorage.getItem('phonics_starred');
      if (savedStarred) setStarredWords(JSON.parse(savedStarred));

      const savedHighScore = localStorage.getItem('phonics_game_high_score');
      if (savedHighScore) setSpellingHighScore(parseInt(savedHighScore, 10));

      const savedScores = localStorage.getItem('phonics_quiz_scores');
      if (savedScores) setQuizScores(JSON.parse(savedScores));
    } catch (e) {
      console.error("Failed to load local learning state:", e);
    }
  }, []);

  // Save states helper
  const saveState = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save ${key} to local storage:`, e);
    }
  };

  const handleToggleComplete = (id: string) => {
    setCompletedWords((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveState('phonics_completed', updated);
      return updated;
    });
  };

  const handleToggleStar = (id: string) => {
    setStarredWords((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveState('phonics_starred', updated);
      return updated;
    });
  };

  const handleRemoveStarDirectly = (id: string) => {
    setStarredWords((prev) => {
      const updated = prev.filter((item) => item !== id);
      saveState('phonics_starred', updated);
      return updated;
    });
  };

  const handleAddQuizScore = (score: number, total: number, category: string) => {
    const newScore = {
      date: new Date().toLocaleDateString('ko-KR'),
      score,
      total,
      category
    };
    setQuizScores((prev) => {
      const updated = [newScore, ...prev];
      saveState('phonics_quiz_scores', updated);
      return updated;
    });
  };

  const handleUpdateHighScore = (score: number) => {
    setSpellingHighScore(score);
    localStorage.setItem('phonics_game_high_score', score.toString());
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans selection:bg-indigo-100" id="phonics-app-root">
      {/* Sidebar Navigation - Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between shrink-0">
        <div className="flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100 text-white font-black text-lg">
                A
              </div>
              <div>
                <h1 className="text-base font-extrabold text-slate-800 tracking-tight leading-tight">파닉스 영어 교실</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">PhonicsMaster</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('board')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'board'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
              id="nav-tab-board"
            >
              <BookOpen className="w-4 h-4" />
              <span>단어 학습판</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
              id="nav-tab-flashcards"
            >
              <Layers className="w-4 h-4" />
              <span>플래시카드</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
              id="nav-tab-quiz"
            >
              <Award className="w-4 h-4" />
              <span>실력 퀴즈</span>
            </button>

            <button
              onClick={() => setActiveTab('game')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
              id="nav-tab-game"
            >
              <Trophy className="w-4 h-4" />
              <span>철자 게임</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
              id="nav-tab-progress"
            >
              <BarChart2 className="w-4 h-4" />
              <span>학습 통계</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-600 rounded-2xl p-4 text-white text-center shadow-lg shadow-indigo-100">
            <p className="text-[10px] opacity-85 mb-1 uppercase tracking-widest font-semibold">Lesson Progress</p>
            <p className="text-2xl font-black italic">{Math.round((completedWords.length / 118) * 100)}%</p>
            <div className="w-full h-1.5 bg-indigo-700 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(completedWords.length / 118) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Notification Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>파닉스 영어 교실에 오신 것을 환영합니다! 귀여운 소리와 단어로 영어 철자 규칙을 마스터해 봐요! 🎒</span>
        </div>

        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-slate-800 leading-none">파닉스 영어 교실</h1>
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">PhonicsMaster</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-extrabold">
              {completedWords.length}/118 완료
            </span>
          </div>

          {/* Mobile navigation tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'board' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
              }`}
            >
              <span>단어 학습판</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'flashcards' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
              }`}
            >
              <span>플래시카드</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'quiz' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
              }`}
            >
              <span>실력 퀴즈</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'game' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
              }`}
            >
              <span>철자 게임</span>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'progress' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'
              }`}
            >
              <span>학습 통계</span>
            </button>
          </nav>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              id="view-animation-container"
            >
              {activeTab === 'board' && (
                <PhonicsBoard
                  completedWords={completedWords}
                  starredWords={starredWords}
                  onToggleComplete={handleToggleComplete}
                  onToggleStar={handleToggleStar}
                />
              )}

              {activeTab === 'flashcards' && (
                <Flashcards
                  completedWords={completedWords}
                  starredWords={starredWords}
                  onToggleComplete={handleToggleComplete}
                  onToggleStar={handleToggleStar}
                />
              )}

              {activeTab === 'quiz' && (
                <QuizView onAddScore={handleAddQuizScore} />
              )}

              {activeTab === 'game' && (
                <SpellingGame
                  onAddScore={handleAddQuizScore}
                  highScore={spellingHighScore}
                  onUpdateHighScore={handleUpdateHighScore}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressTracker
                  completedWords={completedWords}
                  starredWords={starredWords}
                  spellingHighScore={spellingHighScore}
                  quizScores={quizScores}
                  onRemoveStar={handleRemoveStarDirectly}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer info bar at the bottom matching the design */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400 font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="uppercase tracking-wide text-slate-500 text-[10px]">CURRENT VIEW: PHONICS ACADEMY • PRO v1.0</span>
          </div>
          <div className="text-[10px] text-slate-400">
            TOTAL 118 WORDS PROCESSED • UI VERSION 4.12.0
          </div>
        </div>
      </div>
    </div>
  );
}
