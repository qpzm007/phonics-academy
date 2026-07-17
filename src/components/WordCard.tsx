import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Star, CheckCircle, RefreshCw, Sparkles, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import { PhonicsWord } from '../types';
import { speakWord } from '../lib/speech';

interface WordCardProps {
  wordData: PhonicsWord;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onClose?: () => void;
}

export default function WordCard({
  wordData,
  isCompleted,
  isStarred,
  onToggleComplete,
  onToggleStar,
  onClose
}: WordCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [slowPlaying, setSlowPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [practiceStatus, setPracticeStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  // Reset practice when word changes
  useEffect(() => {
    setUserInput('');
    setPracticeStatus('idle');
  }, [wordData]);

  const handlePlaySound = async (rate: number = 1.0) => {
    if (rate < 1.0) {
      setSlowPlaying(true);
    } else {
      setIsPlaying(true);
    }

    try {
      await speakWord(wordData.word, { rate });
    } catch (e) {
      console.error(e);
    } finally {
      setIsPlaying(false);
      setSlowPlaying(false);
    }
  };

  const checkPracticeSpelling = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === wordData.word.toLowerCase()) {
      setPracticeStatus('success');
      if (!isCompleted) {
        onToggleComplete(wordData.id);
      }
    } else {
      setPracticeStatus('fail');
    }
  };

  // Smart syllable / pattern highlighter
  const renderHighlightedWord = () => {
    const word = wordData.word.toLowerCase();
    const group = wordData.patternGroup.toLowerCase();

    // Determine segments to highlight
    if (group === 'a_e' || group === 'i_e' || group === 'o_e' || group === 'u_e') {
      // Magic E highlight: highlight the core vowel and final e
      const vowel = group.split('_')[0];
      const parts: React.ReactNode[] = [];
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char === vowel && i === word.indexOf(vowel)) {
          parts.push(
            <span key={i} className="text-pink-500 font-extrabold underline decoration-pink-300">
              {wordData.word[i]}
            </span>
          );
        } else if (char === 'e' && i === word.length - 1) {
          parts.push(
            <span key={i} className="text-indigo-500 font-extrabold underline decoration-indigo-300">
              {wordData.word[i]}
            </span>
          );
        } else {
          parts.push(<span key={i}>{wordData.word[i]}</span>);
        }
      }
      return <>{parts}</>;
    }

    if (['sm', 'sn', 'st', 'bl', 'cl', 'pl', 'br', 'dr', 'ch', 'sh', 'ng'].includes(group)) {
      // Highlight consonant clusters
      const index = word.indexOf(group);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const cluster = wordData.word.substring(index, index + group.length);
        const after = wordData.word.substring(index + group.length);
        return (
          <>
            {before}
            <span className="text-yellow-500 font-extrabold border-b-2 border-yellow-300">
              {cluster}
            </span>
            {after}
          </>
        );
      }
    }

    if (group === 'ee/ea') {
      // Highlight ee or ea
      const hasEE = word.includes('ee');
      const target = hasEE ? 'ee' : 'ea';
      const index = word.indexOf(target);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const doubleVowel = wordData.word.substring(index, index + 2);
        const after = wordData.word.substring(index + 2);
        return (
          <>
            {before}
            <span className="text-teal-500 font-extrabold border-b-2 border-teal-300">
              {doubleVowel}
            </span>
            {after}
          </>
        );
      }
    }

    if (group === 'oa/ow') {
      const hasOA = word.includes('oa');
      const target = hasOA ? 'oa' : 'ow';
      const index = word.indexOf(target);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const doubleVowel = wordData.word.substring(index, index + 2);
        const after = wordData.word.substring(index + 2);
        return (
          <>
            {before}
            <span className="text-blue-500 font-extrabold border-b-2 border-blue-300">
              {doubleVowel}
            </span>
            {after}
          </>
        );
      }
    }

    if (group === 'ay/ai') {
      const hasAY = word.includes('ay');
      const target = hasAY ? 'ay' : 'ai';
      const index = word.indexOf(target);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const doubleVowel = wordData.word.substring(index, index + 2);
        const after = wordData.word.substring(index + 2);
        return (
          <>
            {before}
            <span className="text-purple-500 font-extrabold border-b-2 border-purple-300">
              {doubleVowel}
            </span>
            {after}
          </>
        );
      }
    }

    if (group === 'oy/oi') {
      const hasOY = word.includes('oy');
      const target = hasOY ? 'oy' : 'oi';
      const index = word.indexOf(target);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const doubleVowel = wordData.word.substring(index, index + 2);
        const after = wordData.word.substring(index + 2);
        return (
          <>
            {before}
            <span className="text-orange-500 font-extrabold border-b-2 border-orange-300">
              {doubleVowel}
            </span>
            {after}
          </>
        );
      }
    }

    if (group === 'ou/ow') {
      const index = word.indexOf('ou') !== -1 ? word.indexOf('ou') : word.indexOf('ow');
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const doubleVowel = wordData.word.substring(index, index + 2);
        const after = wordData.word.substring(index + 2);
        return (
          <>
            {before}
            <span className="text-rose-500 font-extrabold border-b-2 border-rose-300">
              {doubleVowel}
            </span>
            {after}
          </>
        );
      }
    }

    // Short Vowels: A, E, I, O, U
    if (['a', 'e', 'i', 'o', 'u'].includes(group)) {
      const index = word.indexOf(group);
      if (index !== -1) {
        const before = wordData.word.substring(0, index);
        const vowel = wordData.word[index];
        const after = wordData.word.substring(index + 1);
        return (
          <>
            {before}
            <span className="text-emerald-500 font-extrabold border-b-2 border-emerald-300">
              {vowel}
            </span>
            {after}
          </>
        );
      }
    }

    // Default return
    return <>{wordData.word}</>;
  };

  // Pattern grouping visual breakdown
  const getPatternFormula = () => {
    const word = wordData.word.toLowerCase();
    const group = wordData.patternGroup;

    if (group === 'A') return `J/H/C... + am / ap / an / at / ch = ${wordData.word}`;
    if (group === 'E') return `N/P/V... + et / ed / en / ent = ${wordData.word}`;
    if (group === 'I') return `K/L/P/B... + id / ig = ${wordData.word}`;
    if (group === 'O') return `C/M/P/H... + op / ot = ${wordData.word}`;
    if (group === 'U') return `C/S... + up / un / ut = ${wordData.word}`;

    if (group === 'a_e') return `${word[0].toUpperCase()} + a(에이) + ${word.substring(2, word.length-1)} + e(묵음) = ${wordData.word}`;
    if (group === 'i_e') return `${word[0].toUpperCase()} + i(아이) + ${word.substring(2, word.length-1)} + e(묵음) = ${wordData.word}`;
    if (group === 'o_e') return `${word[0].toUpperCase()} + o(오우) + ${word.substring(2, word.length-1)} + e(묵음) = ${wordData.word}`;
    if (group === 'u_e') return `${word[0].toUpperCase()} + u(유/우) + ${word.substring(2, word.length-1)} + e(묵음) = ${wordData.word}`;

    if (['SM', 'SN', 'ST', 'BL', 'CL', 'PL', 'BR', 'DR', 'CH', 'SH', 'NG'].includes(group)) {
      return `${group} (${wordData.pattern}) + ${word.replace(group.toLowerCase(), '')} = ${wordData.word}`;
    }

    return `${wordData.pattern}의 소리 조합 = ${wordData.word}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-md max-w-xl mx-auto" id={`word-card-${wordData.id}`}>
      {/* Top action row */}
      <div className="flex justify-between items-center mb-6">
        <span className="px-3 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          {wordData.pattern}
        </span>

        <div className="flex items-center gap-2">
          {/* Star Button */}
          <button
            onClick={() => onToggleStar(wordData.id)}
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isStarred
                ? 'bg-amber-50 border-amber-200 text-amber-500'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-400 hover:bg-amber-50/50'
            }`}
            title={isStarred ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            id={`star-btn-${wordData.id}`}
          >
            <Star className={`w-4.5 h-4.5 ${isStarred ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Mastered Button */}
          <button
            onClick={() => onToggleComplete(wordData.id)}
            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50/50'
            }`}
            title={isCompleted ? "학습 중으로 표시" : "학습 완료 표시"}
            id={`complete-btn-${wordData.id}`}
          >
            <CheckCircle className={`w-4.5 h-4.5 ${isCompleted ? 'fill-emerald-500 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Big Word Display */}
      <div className="text-center mb-8">
        <div className="inline-block relative">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-wide font-sans mb-2 select-all">
            {renderHighlightedWord()}
          </h1>
          <div className="absolute -right-6 -top-2 animate-pulse">
            {isCompleted && <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-200" />}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-1 text-slate-500 font-medium">
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md font-mono">[{wordData.pronunciation}]</span>
          <span className="text-slate-300">|</span>
          <span className="text-lg text-slate-700 font-semibold">{wordData.meaning}</span>
        </div>
      </div>

      {/* Sound Player Controls */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => handlePlaySound(1.0)}
          disabled={isPlaying || slowPlaying}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold border transition-all duration-300 cursor-pointer text-sm ${
            isPlaying
              ? 'bg-indigo-600 border-indigo-600 text-white scale-98 shadow-inner'
              : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100 hover:shadow-xs hover:scale-101 active:scale-95'
          }`}
          id={`play-sound-normal-${wordData.id}`}
        >
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span>보통 빠르기</span>
        </button>

        <button
          onClick={() => handlePlaySound(0.55)}
          disabled={isPlaying || slowPlaying}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold border transition-all duration-300 cursor-pointer text-sm ${
            slowPlaying
              ? 'bg-teal-600 border-teal-600 text-white scale-98 shadow-inner'
              : 'bg-teal-50 border-teal-100 text-teal-700 hover:bg-teal-100 hover:shadow-xs hover:scale-101 active:scale-95'
          }`}
          id={`play-sound-slow-${wordData.id}`}
        >
          <span className="text-lg">🐢</span>
          <span>천천히 듣기</span>
        </button>
      </div>

      {/* Educational Formula & Learning Points */}
      <div className="space-y-4 mb-8">
        {/* Phonics Formula */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <span>발음 결합 규칙 (Phonics Rule)</span>
          </div>
          <p className="font-mono text-xs font-semibold text-slate-700 bg-white rounded-md px-3 py-2 border border-slate-200 shadow-xs inline-block">
            {getPatternFormula()}
          </p>
        </div>

        {/* Video Learning Point */}
        <div className="bg-gradient-to-br from-indigo-50/40 to-slate-50/50 border border-slate-200 rounded-xl p-4">
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>학습 포인트 (영상 속 꿀팁)</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold">
            {wordData.learningPoint}
          </p>
        </div>
      </div>

      {/* Interactive Spelling Practice */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1.5 uppercase tracking-wider font-mono">
          <span>직접 철자 써보기 (Spelling Practice)</span>
        </h3>

        <form onSubmit={checkPracticeSpelling} className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (practiceStatus !== 'idle') setPracticeStatus('idle');
              }}
              placeholder="여기에 영단어를 써보세요"
              className={`w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-lg tracking-wider focus:outline-none focus:ring-2 transition-all duration-300 ${
                practiceStatus === 'success'
                  ? 'border-emerald-300 bg-emerald-50/30 text-emerald-700 focus:ring-emerald-300'
                  : practiceStatus === 'fail'
                  ? 'border-rose-300 bg-rose-50/30 text-rose-700 focus:ring-rose-300'
                  : 'border-slate-200 bg-white text-slate-800 focus:ring-indigo-300 focus:border-indigo-400'
              }`}
              id={`spelling-input-${wordData.id}`}
            />
            {practiceStatus === 'success' && (
              <span className="absolute right-3 top-2.5 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-0.5 animate-bounce">
                참 잘했어요!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-5 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 text-sm"
            id={`spelling-check-btn-${wordData.id}`}
          >
            <span>확인</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <AnimatePresence>
          {practiceStatus === 'fail' && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-semibold text-rose-500 mt-2 ml-1"
            >
              어라? 철자가 다른 것 같아요! 단어 카드를 다시 보고 입력해 보세요.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 active:scale-98 transition-all duration-200 cursor-pointer text-sm"
          id={`close-btn-${wordData.id}`}
        >
          닫기
        </button>
      )}
    </div>
  );
}
