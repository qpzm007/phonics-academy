import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, HelpCircle, Trophy, RefreshCw, CheckCircle2, ChevronRight, HelpCircle as HintIcon, Sparkles } from 'lucide-react';
import { ALL_PHONICS_WORDS, PHONICS_DATA } from '../data';
import { PhonicsWord } from '../types';
import { speakWord } from '../lib/speech';

interface SpellingGameProps {
  onAddScore: (score: number, total: number, category: string) => void;
  highScore: number;
  onUpdateHighScore: (score: number) => void;
}

export default function SpellingGame({
  onAddScore,
  highScore,
  onUpdateHighScore
}: SpellingGameProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState<PhonicsWord | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<{ id: string; letter: string; originalIndex: number }[]>([]);
  const [assembledLetters, setAssembledLetters] = useState<{ id: string; letter: string; originalIndex: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const [hasChecked, setHasChecked] = useState(false);
  const [checkResult, setCheckResult] = useState<'success' | 'fail' | 'idle'>('idle');
  const [hintCount, setHintCount] = useState(0);

  // Pool of words based on choice
  const wordPool = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...ALL_PHONICS_WORDS];
    }
    const cat = PHONICS_DATA.find(c => c.id === selectedCategory);
    return cat ? cat.groups.flatMap(g => g.words) : [...ALL_PHONICS_WORDS];
  }, [selectedCategory]);

  // Load a new level
  const startNextLevel = () => {
    if (wordPool.length === 0) return;

    // Pick a random word
    const randWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    setCurrentWord(randWord);
    setAssembledLetters([]);
    setHasChecked(false);
    setCheckResult('idle');
    setHintCount(0);

    // Scramble the letters
    // Split the word string into individual characters
    const letters = randWord.word.split('').map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      letter: char,
      originalIndex: index
    }));

    // Perform shuffle making sure it's scrambled (not identical to original)
    let shuffled = [...letters].sort(() => Math.random() - 0.5);
    while (shuffled.map(l => l.letter).join('') === randWord.word && randWord.word.length > 1) {
      shuffled = [...letters].sort(() => Math.random() - 0.5);
    }

    setScrambledLetters(shuffled);

    // Speak word to prompt user
    setTimeout(() => {
      speakWord(randWord.word);
    }, 400);
  };

  const handleStartGame = () => {
    setIsPlaying(true);
    setStreak(0);
    startNextLevel();
  };

  // Add letter to assembly board
  const clickScrambledLetter = (item: { id: string; letter: string; originalIndex: number }) => {
    if (hasChecked && checkResult === 'success') return;

    // Remove from scrambled, add to assembled
    setScrambledLetters(prev => prev.filter(l => l.id !== item.id));
    setAssembledLetters(prev => [...prev, item]);
    setCheckResult('idle');
  };

  // Put letter back to scrambled bank
  const clickAssembledLetter = (item: { id: string; letter: string; originalIndex: number }) => {
    if (hasChecked && checkResult === 'success') return;

    // Remove from assembled, add to scrambled
    setAssembledLetters(prev => prev.filter(l => l.id !== item.id));
    setScrambledLetters(prev => [...prev, item]);
    setCheckResult('idle');
  };

  const handleResetLetters = () => {
    if (!currentWord || (hasChecked && checkResult === 'success')) return;

    // Reconstruct scrambled pool
    const letters = currentWord.word.split('').map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      letter: char,
      originalIndex: index
    }));

    setScrambledLetters([...letters].sort(() => Math.random() - 0.5));
    setAssembledLetters([]);
    setCheckResult('idle');
  };

  const handlePlayAudio = () => {
    if (currentWord) {
      speakWord(currentWord.word);
    }
  };

  // Check spelling
  const handleCheckSpelling = () => {
    if (!currentWord) return;

    const spelledWord = assembledLetters.map(l => l.letter).join('');
    if (spelledWord.toLowerCase() === currentWord.word.toLowerCase()) {
      setCheckResult('success');
      setStreak(prev => {
        const next = prev + 1;
        if (next > highScore) {
          onUpdateHighScore(next);
        }
        return next;
      });
      setHasChecked(true);
      speakWord('Splendid!');
    } else {
      setCheckResult('fail');
      speakWord('Whoops, try again!');
    }
  };

  // Auto assemble one correct letter as hint
  const handleRevealHint = () => {
    if (!currentWord || hintCount >= currentWord.word.length) return;

    // Find the letter at index `assembledLetters.length` of the actual word
    const nextCorrectChar = currentWord.word[assembledLetters.length];
    if (!nextCorrectChar) return;

    // Find that character in the scrambled pool
    const itemInScrambled = scrambledLetters.find(l => l.letter === nextCorrectChar);

    if (itemInScrambled) {
      // Transfer to assembled
      setScrambledLetters(prev => prev.filter(l => l.id !== itemInScrambled.id));
      setAssembledLetters(prev => [...prev, itemInScrambled]);
      setHintCount(prev => prev + 1);
    } else {
      // If the correct character isn't in scrambled, it might already be assembled incorrectly further down.
      // Easiest is to reset and then place correct letters up to current point + 1.
      const correctText = currentWord.word;
      const letters = correctText.split('').map((char, index) => ({
        id: `${char}-${index}-${Math.random()}`,
        letter: char,
        originalIndex: index
      }));

      const numToAssemble = assembledLetters.length + 1;
      const assembledSubset = letters.slice(0, numToAssemble);
      const scrambledRemaining = letters.slice(numToAssemble).sort(() => Math.random() - 0.5);

      setAssembledLetters(assembledSubset);
      setScrambledLetters(scrambledRemaining);
      setHintCount(prev => prev + 1);
    }
    setCheckResult('idle');
  };

  return (
    <div className="space-y-6" id="spelling-game-section">
      {!isPlaying ? (
        /* Intro screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-7 h-7 text-teal-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">파닉스 철자 맞추기 게임</h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
              귀로 들려주는 영어 소리를 잘 듣고, 뒤섞여 있는 알파벳 블록을 알맞은 순서대로 하나씩 조립하여 퍼즐을 풀어보세요! 연속 콤보가 유지됩니다.
            </p>
          </div>

          {/* Category Selector */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">게임 단어 범위 선택</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-3 rounded-xl border text-left text-sm transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'border-teal-500 bg-teal-50/30 text-teal-900 font-bold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50/20'
                }`}
              >
                🎒 전체 118단어
              </button>
              {PHONICS_DATA.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`p-3 rounded-xl border text-left text-sm transition-all duration-200 cursor-pointer ${
                    selectedCategory === c.id
                      ? 'border-teal-500 bg-teal-50/30 text-teal-900 font-bold'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-50/20'
                  }`}
                >
                  💡 {c.koreanTitle} 세트
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center text-xs text-slate-500">
            <span>내 최고 콤보 기록:</span>
            <span className="font-extrabold text-teal-600 text-sm flex items-center gap-1">
              🏆 {highScore} 연속
            </span>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full py-3.5 rounded-xl bg-teal-600 text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm hover:bg-teal-700 active:scale-98 cursor-pointer"
            id="start-spelling-game"
          >
            블록 맞추기 게임 시작하기
          </button>
        </div>
      ) : (
        /* Active Game Mode */
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header Stats bar */}
          <div className="flex justify-between items-center bg-white rounded-2xl px-5 py-3.5 border border-slate-200 shadow-xs">
            <button
              onClick={() => setIsPlaying(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
              id="exit-game-btn"
            >
              나가기
            </button>

            {/* Streak count */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-400">현재 콤보:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-black animate-pulse flex items-center gap-0.5">
                🔥 {streak}
              </span>
            </div>

            {/* High Score */}
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
              최고기록: {highScore}
            </span>
          </div>

          {/* Game Core Area */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center space-y-8">
            {/* Word details hidden prompt */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                {currentWord?.pattern}
              </span>

              {/* Word definition hint */}
              <div className="pt-2">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">주어진 단어 뜻</span>
                <span className="text-2xl font-bold text-slate-800 tracking-wide mt-1 block">
                  "{currentWord?.meaning}"
                </span>
                <span className="text-slate-400 font-semibold text-xs mt-1 block">
                  [{currentWord?.pronunciation}]
                </span>
              </div>
            </div>

            {/* Sound play button */}
            <button
              onClick={handlePlayAudio}
              className="mx-auto flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 font-bold text-sm transition-all duration-350 hover:scale-102 active:scale-95 cursor-pointer"
              id="game-audio-play"
            >
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>소리 다시 듣기</span>
            </button>

            {/* ASSEMBLY BOARD */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-left">조립된 단어판</span>
              <div className="w-full min-h-[70px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-4 flex justify-center items-center gap-2 flex-wrap">
                {assembledLetters.length === 0 ? (
                  <span className="text-xs text-slate-400 font-semibold">아래의 문자 블록들을 순서대로 클릭해 올리세요</span>
                ) : (
                  assembledLetters.map((item, idx) => (
                    <motion.button
                       layoutId={item.id}
                      key={item.id}
                      onClick={() => clickAssembledLetter(item)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl border shadow-sm transition-all cursor-pointer ${
                        checkResult === 'success'
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-100'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {item.letter}
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* SCRAMBLED BANK */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">글자 은행 (Letter Bank)</span>
                {checkResult !== 'success' && (
                  <button
                    onClick={handleResetLetters}
                    className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>전체 리셋</span>
                  </button>
                )}
              </div>

              <div className="w-full min-h-[70px] bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex justify-center items-center gap-2 flex-wrap">
                {scrambledLetters.length === 0 && assembledLetters.length > 0 ? (
                  <span className="text-xs text-slate-400 font-bold">블록 완료! 위 검사 버튼을 눌러 확인해 보세요</span>
                ) : (
                  scrambledLetters.map((item) => (
                    <motion.button
                      layoutId={item.id}
                      key={item.id}
                      onClick={() => clickScrambledLetter(item)}
                      className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-xl text-slate-700 hover:border-indigo-400 hover:scale-105 active:scale-90 transition-all cursor-pointer"
                    >
                      {item.letter}
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Response Banner */}
            <AnimatePresence>
              {checkResult !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-left border flex items-start gap-2.5 ${
                    checkResult === 'success'
                      ? 'bg-emerald-50/30 border-emerald-100 text-emerald-800'
                      : 'bg-rose-50/30 border-rose-100 text-rose-800'
                  }`}
                >
                  {checkResult === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-extrabold text-sm block">
                      {checkResult === 'success'
                        ? '정답입니다! 완벽해요! 🥳'
                        : '아하, 철자의 순서가 맞지 않아요! 다시 조립해 보세요.'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold block mt-1">
                      💡 {currentWord?.word}의 어원 학습: {currentWord?.learningPoint}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons footer */}
          <div className="flex justify-between gap-3">
            {checkResult !== 'success' ? (
              <>
                {/* Hint Button */}
                <button
                  onClick={handleRevealHint}
                  disabled={hintCount >= (currentWord?.word.length || 0)}
                  className="px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  id="game-hint-btn"
                >
                  <HintIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>힌트 보기 ({hintCount}/{currentWord?.word.length})</span>
                </button>

                {/* Confirm Word Button */}
                <button
                  onClick={handleCheckSpelling}
                  disabled={scrambledLetters.length > 0}
                  className="flex-grow py-3 rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-200 cursor-pointer"
                  id="game-check-btn"
                >
                  정답 확인하기
                </button>
              </>
            ) : (
              <button
                onClick={startNextLevel}
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-1 shadow-sm transition-all duration-200 cursor-pointer"
                id="game-next-level-btn"
              >
                <span>다음 단어 도전하기 (다음 레벨)</span>
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
