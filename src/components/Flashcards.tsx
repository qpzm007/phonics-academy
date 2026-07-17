import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, CheckCircle, RefreshCw, Volume2, ArrowLeft, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PHONICS_DATA, ALL_PHONICS_WORDS } from '../data';
import { PhonicsWord } from '../types';
import { speakWord } from '../lib/speech';

interface FlashcardsProps {
  completedWords: string[];
  starredWords: string[];
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export default function Flashcards({
  completedWords,
  starredWords,
  onToggleComplete,
  onToggleStar
}: FlashcardsProps) {
  const [deckCategory, setDeckCategory] = useState<string>('all');
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speakSpeed, setSpeakSpeed] = useState<number>(1.0);

  // Filter words for flashcard deck
  const studyWords = useMemo(() => {
    let list: PhonicsWord[] = [];
    if (deckCategory === 'all') {
      list = [...ALL_PHONICS_WORDS];
    } else if (deckCategory === 'starred') {
      list = ALL_PHONICS_WORDS.filter(w => starredWords.includes(w.id));
    } else if (deckCategory === 'uncompleted') {
      list = ALL_PHONICS_WORDS.filter(w => !completedWords.includes(w.id));
    } else {
      const cat = PHONICS_DATA.find(c => c.id === deckCategory);
      if (cat) {
        list = cat.groups.flatMap(g => g.words);
      }
    }

    // Shuffle the list for better training
    return list.sort(() => Math.random() - 0.5);
  }, [deckCategory, starredWords, completedWords, isStarted]); // reshuffle only when deck restarts

  const currentWord = studyWords[currentIndex];

  const handleStartDeck = () => {
    if (studyWords.length > 0) {
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsStarted(true);
      // Pronounce first word
      setTimeout(() => {
        if (studyWords[0]) speakWord(studyWords[0].word);
      }, 300);
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Speak next word automatically
      setTimeout(() => {
        speakWord(studyWords[currentIndex + 1].word, { rate: speakSpeed });
      }, 300);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => {
        speakWord(studyWords[currentIndex - 1].word, { rate: speakSpeed });
      }, 300);
    }
  };

  const playSpeech = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentWord) {
      speakWord(currentWord.word, { rate: speakSpeed });
    }
  };

  const toggleSpeakSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSpeed = speakSpeed === 1.0 ? 0.6 : 1.0;
    setSpeakSpeed(newSpeed);
    if (currentWord) {
      speakWord(currentWord.word, { rate: newSpeed });
    }
  };

  const handleFinishDeck = () => {
    setIsStarted(false);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6" id="flashcards-section">
      {!isStarted ? (
        /* Setup / Deck Selection Screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto shadow-xs">
            <Layers className="w-7 h-7 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">플래시카드 자율 학습</h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
              모르는 단어는 앞뒤로 뒤집으며 공부하고, 완벽히 습득한 단어는 바로바로 체크하여 진도를 마스터해 보세요!
            </p>
          </div>

          {/* Deck Choices */}
          <div className="space-y-2.5 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">학습 카드 세트 선택</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => setDeckCategory('all')}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  deckCategory === 'all'
                    ? 'border-indigo-500 bg-indigo-50/30 text-indigo-900 font-bold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50/20'
                }`}
                id="deck-all"
              >
                <span className="block text-sm">🎒 전체 단어 세트</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">총 {ALL_PHONICS_WORDS.length}단어 골고루 학습</span>
              </button>

              <button
                onClick={() => setDeckCategory('starred')}
                disabled={starredWords.length === 0}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  starredWords.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  deckCategory === 'starred'
                    ? 'border-amber-500 bg-amber-50/30 text-amber-900 font-bold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50/20'
                }`}
                id="deck-starred"
              >
                <span className="block text-sm flex items-center gap-1">
                  <span>⭐ 즐겨찾기 단어</span>
                  {starredWords.length > 0 && <span className="bg-amber-100 text-amber-700 text-[9px] px-1.5 rounded-full font-bold">{starredWords.length}</span>}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                  {starredWords.length === 0 ? "먼저 단어에 별표를 추가하세요" : "내가 찜한 중요 단어만 복습"}
                </span>
              </button>

              {PHONICS_DATA.map((cat) => {
                const wordsCount = cat.groups.flatMap(g => g.words).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setDeckCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      deckCategory === cat.id
                        ? 'border-indigo-500 bg-indigo-50/30 text-indigo-900 font-bold'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50/20'
                    }`}
                    id={`deck-${cat.id}`}
                  >
                    <span className="block text-sm">💡 {cat.koreanTitle} ({cat.title})</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">총 {wordsCount}단어 학습</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleStartDeck}
            disabled={studyWords.length === 0}
            className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-98 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="start-flashcards-btn"
          >
            선택한 카드로 학습 시작하기 ({studyWords.length}개)
          </button>
        </div>
      ) : (
        /* Active Card Screen */
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header Progress indicator */}
          <div className="flex justify-between items-center bg-white rounded-2xl px-5 py-3.5 border border-slate-200 shadow-xs">
            <button
              onClick={handleFinishDeck}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
              id="exit-deck-btn"
            >
              <span>나가기</span>
            </button>

            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full font-mono">
              카드 {currentIndex + 1} / {studyWords.length}
            </span>

            {/* Quick Speed Controller */}
            <button
              onClick={toggleSpeakSpeed}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                speakSpeed < 1.0
                  ? 'bg-teal-50 border-teal-200 text-teal-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              id="deck-speed-toggle"
            >
              {speakSpeed < 1.0 ? "🐢 느리게 듣는 중" : "🔊 보통 속도"}
            </button>
          </div>

          {/* Flashcard 3D Perspective Container */}
          <div
            className="relative w-full aspect-5/3 md:aspect-1.8/1 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1200px' }}
            id="interactive-flashcard"
          >
            {/* Card Object */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full relative"
            >
              {/* CARD FRONT SIDE */}
              <div
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md p-8 flex flex-col justify-between items-center"
              >
                <div className="w-full flex justify-between items-start">
                  <span className="text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {currentWord.pattern}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">카드를 탭하여 뜻 확인</span>
                </div>

                {/* Big Center Word */}
                <div className="text-center space-y-4">
                  <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-wide font-sans">
                    {currentWord.word}
                  </h1>
                  <p className="text-xs text-slate-400 font-semibold">발음 기호나 의미를 맞춘 뒤 뒤집어 보세요!</p>
                </div>

                {/* Speaker icon bottom */}
                <button
                  onClick={playSpeech}
                  className="p-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-100 active:scale-95 transition-all duration-200 cursor-pointer"
                  title="발음 듣기"
                  id="card-front-speaker"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* CARD BACK SIDE */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 bg-slate-900 text-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between"
              >
                {/* Top back metadata */}
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold bg-white/10 border border-white/20 text-white/90 px-2.5 py-1 rounded-md">
                    정답 및 설명
                  </span>
                  <div className="flex gap-2">
                    {/* Star in Card */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(currentWord.id);
                      }}
                      className={`p-1.5 rounded-full border transition-all duration-200 ${
                        starredWords.includes(currentWord.id)
                          ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                          : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${starredWords.includes(currentWord.id) ? 'fill-amber-400' : ''}`} />
                    </button>

                    {/* Mastered in Card */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(currentWord.id);
                      }}
                      className={`p-1.5 rounded-full border transition-all duration-200 ${
                        completedWords.includes(currentWord.id)
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-white/40 hover:text-white/80'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${completedWords.includes(currentWord.id) ? 'fill-emerald-500 text-white' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Back Core Info */}
                <div className="text-center space-y-2 my-auto">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide font-sans text-indigo-400">
                    {currentWord.word}
                  </h2>
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-sm font-bold bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 px-2.5 py-0.5 rounded-md">
                      [{currentWord.pronunciation}]
                    </span>
                    <span className="text-lg font-bold text-white">{currentWord.meaning}</span>
                  </div>

                  {/* Learning Points (Back Card) */}
                  <p className="text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-xl p-3 max-w-sm mx-auto leading-normal mt-3">
                    💡 <span className="font-bold">포인트:</span> {currentWord.learningPoint}
                  </p>
                </div>

                {/* Back voice button */}
                <div className="flex justify-center">
                  <button
                    onClick={playSpeech}
                    className="p-2 px-4 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 active:scale-95 transition-all duration-200 text-xs font-bold flex items-center gap-1.5"
                    id="card-back-speaker"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>발음 다시 듣기</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick study status feedback bar */}
          <div className="flex justify-between items-center bg-slate-100/50 border border-slate-250/60 rounded-xl p-3 px-5 text-xs font-semibold text-slate-500">
            <span>💡 팁: 마스터한 단어는 오른쪽 위 체크 표시(✅)를 눌러 기록하세요!</span>
          </div>

          {/* Swipe navigation buttons */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
              className="px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-slate-700 text-sm flex items-center gap-2 cursor-pointer"
              id="card-prev-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전 단어</span>
            </button>

            {currentIndex === studyWords.length - 1 ? (
              <button
                onClick={handleFinishDeck}
                className="flex-grow py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                id="card-finish-btn"
              >
                <CheckCircle className="w-4.5 h-4.5" />
                <span>세트 학습 완료!</span>
              </button>
            ) : (
              <button
                onClick={handleNextCard}
                className="flex-grow py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                id="card-next-btn"
              >
                <span>다음 단어로</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
