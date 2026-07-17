import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, CheckCircle, Volume2, ArrowRight, Sparkles, Filter, X, Grid, List } from 'lucide-react';
import { PHONICS_DATA } from '../data';
import { PhonicsWord, MainCategoryType } from '../types';
import WordCard from './WordCard';
import { speakWord } from '../lib/speech';

interface PhonicsBoardProps {
  completedWords: string[];
  starredWords: string[];
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export default function PhonicsBoard({
  completedWords,
  starredWords,
  onToggleComplete,
  onToggleStar
}: PhonicsBoardProps) {
  const [activeCategory, setActiveCategory] = useState<MainCategoryType>('short');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStarredOnly, setFilterStarredOnly] = useState(false);
  const [filterUncompletedOnly, setFilterUncompletedOnly] = useState(false);
  const [selectedWord, setSelectedWord] = useState<PhonicsWord | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  // Quick sound click handler for direct board audio play
  const playWordSoundDirectly = async (e: React.MouseEvent, wordObj: PhonicsWord) => {
    e.stopPropagation(); // Don't open card
    setIsSpeakingId(wordObj.id);
    try {
      await speakWord(wordObj.word, { rate: 1.0 });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpeakingId(null);
    }
  };

  // Find category detail
  const currentCategoryObj = useMemo(() => {
    return PHONICS_DATA.find(cat => cat.id === activeCategory)!;
  }, [activeCategory]);

  // Handle Search and Filters globally or per tab
  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return currentCategoryObj.groups.map(group => {
      const filteredWords = group.words.filter(word => {
        // Matches search query (English word, Korean meaning, pronunciation, or learning points)
        const matchesSearch = q === '' ||
          word.word.toLowerCase().includes(q) ||
          word.meaning.toLowerCase().includes(q) ||
          word.pronunciation.toLowerCase().includes(q) ||
          word.learningPoint.toLowerCase().includes(q);

        // Matches Star filter
        const matchesStar = !filterStarredOnly || starredWords.includes(word.id);

        // Matches Uncompleted filter
        const matchesUncompleted = !filterUncompletedOnly || !completedWords.includes(word.id);

        return matchesSearch && matchesStar && matchesUncompleted;
      });

      return {
        ...group,
        words: filteredWords
      };
    }).filter(group => group.words.length > 0); // Only keep groups that have matching words
  }, [currentCategoryObj, searchQuery, filterStarredOnly, filterUncompletedOnly, starredWords, completedWords]);

  // Count matches
  const totalCategoryWords = useMemo(() => {
    return currentCategoryObj.groups.flatMap(g => g.words).length;
  }, [currentCategoryObj]);

  const filteredWordsCount = useMemo(() => {
    return filteredGroups.flatMap(g => g.words).length;
  }, [filteredGroups]);

  // Color mappings for dynamic theme highlights
  const categoryStyles = {
    short: {
      accent: 'emerald',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-100',
      textAccent: 'text-emerald-600',
      tabActive: 'bg-emerald-600 text-white shadow-emerald-200',
      wordBg: 'hover:bg-emerald-50/40 hover:border-emerald-200'
    },
    long: {
      accent: 'indigo',
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-100',
      textAccent: 'text-indigo-600',
      tabActive: 'bg-indigo-600 text-white shadow-indigo-200',
      wordBg: 'hover:bg-indigo-50/40 hover:border-indigo-200'
    },
    consonant: {
      accent: 'amber',
      bgLight: 'bg-amber-50',
      borderLight: 'border-amber-100',
      textAccent: 'text-amber-600',
      tabActive: 'bg-amber-500 text-white shadow-amber-200',
      wordBg: 'hover:bg-amber-50/30 hover:border-amber-200'
    },
    vowel: {
      accent: 'purple',
      bgLight: 'bg-purple-50',
      borderLight: 'border-purple-100',
      textAccent: 'text-purple-600',
      tabActive: 'bg-purple-600 text-white shadow-purple-200',
      wordBg: 'hover:bg-purple-50/40 hover:border-purple-200'
    }
  }[activeCategory];

  return (
    <div className="space-y-6" id="phonics-board-container">
      {/* Category Tabs in Clean Minimal style */}
      <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {PHONICS_DATA.map((cat) => {
            const isActive = activeCategory === cat.id;
            const isShort = cat.id === 'short';
            const isLong = cat.id === 'long';
            const isCons = cat.id === 'consonant';
            const isVow = cat.id === 'vowel';

            let tabClass = 'flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center border transition-all duration-300 cursor-pointer ';
            if (isActive) {
              if (isShort) tabClass += 'bg-emerald-50/80 text-emerald-800 border-emerald-200 font-extrabold shadow-xs';
              else if (isLong) tabClass += 'bg-indigo-50/80 text-indigo-800 border-indigo-200 font-extrabold shadow-xs';
              else if (isCons) tabClass += 'bg-amber-50/80 text-amber-800 border-amber-200 font-extrabold shadow-xs';
              else tabClass += 'bg-purple-50/80 text-purple-800 border-purple-200 font-extrabold shadow-xs';
            } else {
              tabClass += 'bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium';
            }

            // Category progress percentage
            const catWords = cat.groups.flatMap(g => g.words);
            const masteredCount = catWords.filter(w => completedWords.includes(w.id)).length;
            const progressPct = catWords.length > 0 ? Math.round((masteredCount / catWords.length) * 100) : 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                  setFilterStarredOnly(false);
                  setFilterUncompletedOnly(false);
                }}
                className={tabClass}
                id={`cat-tab-${cat.id}`}
              >
                <span className="text-[10px] uppercase font-black tracking-widest opacity-80 leading-none mb-0.5">{cat.title}</span>
                <span className="text-xs font-bold">{cat.koreanTitle}</span>
                {/* Micro Progress Bar on tab */}
                <div className="w-14 bg-slate-100 h-1 rounded-full mt-2 overflow-hidden border border-slate-200/40">
                  <div
                    className={`h-full ${isActive ? (isShort ? 'bg-emerald-500' : isLong ? 'bg-indigo-500' : isCons ? 'bg-amber-400' : 'bg-purple-500') : 'bg-slate-300'}`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Concept Header Panel styled EXACTLY like Clean Minimalism Design HTML */}
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 pt-2 gap-4">
        <div>
          <h2 className="text-3xl font-light text-slate-800 tracking-tight">
            {{ short: 1, long: 2, consonant: 3, vowel: 4 }[activeCategory]}. <span className="font-semibold">{currentCategoryObj.koreanTitle} ({currentCategoryObj.title})</span>
          </h2>
          <p className="text-slate-500 mt-1.5 italic text-sm leading-relaxed max-w-2xl">
            {currentCategoryObj.concept}
          </p>
        </div>
        <div className="flex space-x-6 text-right self-start md:self-auto shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Patterns</p>
            <p className="text-lg font-semibold text-slate-800">{currentCategoryObj.groups.length} Types</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total Vocabulary</p>
            <p className="text-lg font-semibold text-slate-800">{totalCategoryWords} Words</p>
          </div>
        </div>
      </header>

      {/* Global Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="단어, 뜻, 발음 또는 학습 내용을 검색해 보세요..."
            className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all duration-300"
            id="phonics-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStarredOnly(!filterStarredOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer ${
              filterStarredOnly
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            id="filter-star-btn"
          >
            <Star className={`w-3.5 h-3.5 ${filterStarredOnly ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span>즐겨찾기만</span>
          </button>

          <button
            onClick={() => setFilterUncompletedOnly(!filterUncompletedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer ${
              filterUncompletedOnly
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            id="filter-uncompleted-btn"
          >
            <CheckCircle className={`w-3.5 h-3.5 ${filterUncompletedOnly ? 'fill-indigo-500 text-indigo-600' : ''}`} />
            <span>미완료만</span>
          </button>
        </div>
      </div>

      {/* Main Phonics Groups & Words Grid */}
      <div className="space-y-8">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-base font-bold text-slate-700 mb-1">검색 결과가 없어요!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              다른 영단어, 한글 발음, 혹은 뜻으로 검색하시거나 선택 필터를 해제해 보세요.
            </p>
            {(searchQuery || filterStarredOnly || filterUncompletedOnly) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStarredOnly(false);
                  setFilterUncompletedOnly(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition-all duration-200 cursor-pointer"
              >
                필터 모두 초기화
              </button>
            )}
          </div>
        ) : (
          filteredGroups.map((group) => {
            const groupTotal = group.words.length;
            const groupMastered = group.words.filter(w => completedWords.includes(w.id)).length;

            return (
              <div
                key={group.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
                id={`group-card-${group.id}`}
              >
                {/* Group Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-md bg-slate-100 font-bold ${categoryStyles.textAccent}`}>
                        {group.patternKey}
                      </span>
                      <span>{group.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-1">
                      {group.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-150 text-slate-500 font-semibold">
                    <span>진도율</span>
                    <span className={`font-bold ${categoryStyles.textAccent}`}>{groupMastered} / {groupTotal}</span>
                  </div>
                </div>

                {/* Words Grid - Clean Minimalistic Word Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {group.words.map((wordObj) => {
                    const isWordCompleted = completedWords.includes(wordObj.id);
                    const isWordStarred = starredWords.includes(wordObj.id);
                    const isSpeaking = isSpeakingId === wordObj.id;

                    return (
                      <div
                        key={wordObj.id}
                        onClick={() => setSelectedWord(wordObj)}
                        className={`group relative p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/30 hover:border-slate-350 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px]`}
                        id={`word-tile-${wordObj.id}`}
                      >
                        {/* Word indicators */}
                        <div className="flex justify-between items-start w-full mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-slate-500 uppercase tracking-wider">
                            {wordObj.patternGroup}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isWordStarred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />}
                            {isWordCompleted && <CheckCircle className="w-3.5 h-3.5 fill-emerald-500 text-white" />}
                          </div>
                        </div>

                        {/* Spelling */}
                        <div className="my-1.5">
                          <span className="text-2xl font-bold text-slate-800 tracking-tight font-sans block group-hover:text-indigo-600 transition-all duration-200">
                            {wordObj.word}
                          </span>
                        </div>

                        {/* Meaning & Audio Quick Play */}
                        <div className="flex items-end justify-between w-full mt-auto">
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 font-mono block leading-tight">[{wordObj.pronunciation}]</span>
                            <span className="text-xs font-bold text-slate-600 block leading-tight mt-0.5">{wordObj.meaning}</span>
                          </div>

                          <button
                            onClick={(e) => playWordSoundDirectly(e, wordObj)}
                            className={`p-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                              isSpeaking
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white border-slate-200 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 group-hover:bg-indigo-50/50'
                            }`}
                            title="발음 듣기"
                            id={`quick-audio-${wordObj.id}`}
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Word Study slide-over modal drawer */}
      <AnimatePresence>
        {selectedWord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWord(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative z-10 w-full max-w-xl"
            >
              <button
                onClick={() => setSelectedWord(null)}
                className="absolute right-4 top-4 z-20 p-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 shadow-sm transition-all duration-200 cursor-pointer"
                id="close-modal-btn"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <WordCard
                wordData={selectedWord}
                isCompleted={completedWords.includes(selectedWord.id)}
                isStarred={starredWords.includes(selectedWord.id)}
                onToggleComplete={onToggleComplete}
                onToggleStar={onToggleStar}
                onClose={() => setSelectedWord(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
