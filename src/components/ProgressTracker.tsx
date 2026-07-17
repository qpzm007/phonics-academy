import React, { useMemo } from 'react';
import { Award, Star, CheckCircle, Trophy, BookOpen, Clock, Heart, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { ALL_PHONICS_WORDS, PHONICS_DATA } from '../data';
import { speakWord } from '../lib/speech';

interface ProgressTrackerProps {
  completedWords: string[];
  starredWords: string[];
  spellingHighScore: number;
  quizScores: {
    date: string;
    score: number;
    total: number;
    category: string;
  }[];
  onRemoveStar: (id: string) => void;
}

export default function ProgressTracker({
  completedWords,
  starredWords,
  spellingHighScore,
  quizScores,
  onRemoveStar
}: ProgressTrackerProps) {
  // Stats calculations
  const totalWords = ALL_PHONICS_WORDS.length;
  const completedCount = completedWords.length;
  const overallProgressPct = totalWords > 0 ? Math.round((completedCount / totalWords) * 100) : 0;

  // Category statistics
  const categoryStats = useMemo(() => {
    return PHONICS_DATA.map(cat => {
      const catWords = cat.groups.flatMap(g => g.words);
      const catWordsTotal = catWords.length;
      const catWordsCompleted = catWords.filter(w => completedWords.includes(w.id)).length;
      const progressPct = catWordsTotal > 0 ? Math.round((catWordsCompleted / catWordsTotal) * 100) : 0;

      return {
        id: cat.id,
        koreanTitle: cat.koreanTitle,
        title: cat.title,
        completed: catWordsCompleted,
        total: catWordsTotal,
        pct: progressPct
      };
    });
  }, [completedWords]);

  // Starred words list
  const favoritedWords = useMemo(() => {
    return ALL_PHONICS_WORDS.filter(w => starredWords.includes(w.id));
  }, [starredWords]);

  // Achievement Badges mapping
  const badges = useMemo(() => {
    // Count completions per category
    const countShort = ALL_PHONICS_WORDS.filter(w => w.id.startsWith('short_') && completedWords.includes(w.id)).length;
    const countLong = ALL_PHONICS_WORDS.filter(w => w.id.startsWith('long_') && completedWords.includes(w.id)).length;
    const countCons = ALL_PHONICS_WORDS.filter(w => w.id.startsWith('double_') && !w.id.startsWith('double_ee_ea') && !w.id.startsWith('double_oa_ow') && !w.id.startsWith('double_ay_ai') && !w.id.startsWith('double_oy_oi') && !w.id.startsWith('double_ou_ow') && completedWords.includes(w.id)).length;
    // Wait, the id prefixes for double vowels: double_ee_ea, double_oa_ow, double_ay_ai, double_oy_oi, double_ou_ow
    const countVow = ALL_PHONICS_WORDS.filter(w => (w.id.includes('ee_ea') || w.id.includes('oa_ow') || w.id.includes('ay_ai') || w.id.includes('oy_oi') || w.id.includes('ou_ow')) && completedWords.includes(w.id)).length;

    return [
      {
        id: 'pioneer',
        name: '파닉스 개척자',
        description: '첫 번째 단어를 완벽히 마스터해 보세요!',
        condition: completedCount >= 1,
        icon: '🌱',
        color: 'from-emerald-400 to-green-500'
      },
      {
        id: 'short_hero',
        name: '단모음 대장',
        description: '단모음 단어 10개 이상 마스터 달성',
        condition: countShort >= 10,
        icon: '🍎',
        color: 'from-teal-400 to-emerald-500'
      },
      {
        id: 'long_wizard',
        name: '매직 E 마법사',
        description: '장모음 단어 10개 이상 마스터 달성',
        condition: countLong >= 10,
        icon: '🪄',
        color: 'from-indigo-400 to-violet-500'
      },
      {
        id: 'cons_knight',
        name: '이중자음 기사',
        description: '이중자음 단어 10개 이상 마스터 달성',
        condition: countCons >= 10,
        icon: '🛡️',
        color: 'from-amber-400 to-orange-500'
      },
      {
        id: 'vow_legend',
        name: '이중모음 명사',
        description: '이중모음 단어 10개 이상 마스터 달성',
        condition: countVow >= 10,
        icon: '🌟',
        color: 'from-purple-400 to-pink-500'
      },
      {
        id: 'combo_king',
        name: '철자 맞추기 챔피언',
        description: '게임 콤보 5회 이상 연속 성공 달성',
        condition: spellingHighScore >= 5,
        icon: '🔥',
        color: 'from-rose-400 to-pink-500'
      },
      {
        id: 'mastermind',
        name: '파닉스 마스터',
        description: '총 50개 단어 이상 학습 완료 달성',
        condition: completedCount >= 50,
        icon: '🎓',
        color: 'from-cyan-400 to-blue-600'
      },
      {
        id: 'grandmaster',
        name: '파닉스 대종사',
        description: '총 100개 단어 이상 학습 완료 달성',
        condition: completedCount >= 100,
        icon: '👑',
        color: 'from-yellow-400 to-amber-600'
      }
    ];
  }, [completedWords, spellingHighScore, completedCount]);

  return (
    <div className="space-y-6" id="progress-view-container">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Radial progress */}
          <div className="relative w-32 h-32 flex items-center justify-center bg-slate-50 rounded-full border-4 border-slate-100 shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-black text-slate-800 block leading-tight">{overallProgressPct}%</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mt-1">완성 진도율</span>
            </div>
            {/* Cute mini icon wrapper */}
            <div className="absolute -right-1 -bottom-1 w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 text-indigo-600 fill-indigo-200" />
            </div>
          </div>

          {/* Overview text details */}
          <div className="flex-grow space-y-4 text-center md:text-left w-full">
            <div>
              <h2 className="text-xl font-bold text-slate-800">나의 파닉스 학습 다이어리</h2>
              <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
                파닉스에 등장하는 모든 118개의 필수 영단어와 규칙들을 내 손으로 다듬으며 학습하고 있습니다. 꾸준함이 실력을 만듭니다!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-lg font-black text-slate-700 block">{completedCount}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">완료한 단어</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-lg font-black text-slate-700 block">{starredWords.length}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">즐겨찾기 단어</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-lg font-black text-slate-700 block">🔥 {spellingHighScore}</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">게임 최고콤보</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category split metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryStats.map(cat => {
          let catTheme = 'indigo';
          if (cat.id === 'short') catTheme = 'emerald';
          else if (cat.id === 'consonant') catTheme = 'amber';
          else if (cat.id === 'vowel') catTheme = 'purple';

          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${catTheme === 'emerald' ? 'bg-emerald-500' : catTheme === 'indigo' ? 'bg-indigo-500' : catTheme === 'amber' ? 'bg-amber-400' : 'bg-purple-500'}`} />
                  {cat.koreanTitle} ({cat.title})
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  {cat.completed} / {cat.total} 단어 ({cat.pct}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    catTheme === 'emerald' ? 'bg-emerald-500' :
                    catTheme === 'indigo' ? 'bg-indigo-500' :
                    catTheme === 'amber' ? 'bg-amber-400' : 'bg-purple-500'
                  }`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-600 flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <Award className="w-4 h-4 text-indigo-500" />
          <span>파닉스 학습 훈장 (Achievement Badges)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border text-center relative overflow-hidden transition-all duration-300 ${
                badge.condition
                  ? 'bg-white border-slate-200 shadow-xs hover:shadow-md hover:scale-103'
                  : 'bg-slate-50/50 border-slate-200 opacity-40'
              }`}
            >
              {badge.condition && (
                <div className={`absolute -right-6 -bottom-6 w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} opacity-10`} />
              )}

              <span className="text-3xl block mb-2">{badge.condition ? badge.icon : '🔒'}</span>
              <span className={`text-xs font-bold block ${badge.condition ? 'text-slate-800' : 'text-slate-400'}`}>
                {badge.name}
              </span>
              <span className="text-[9px] text-slate-400 block mt-1 leading-tight font-semibold">
                {badge.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Starred Words list manager */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-600 flex items-center gap-1.5 pb-2 border-b border-slate-100">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
          <span>내가 찜한 오답 / 중요 단어 모음 ({favoritedWords.length}개)</span>
        </h3>

        {favoritedWords.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-semibold leading-relaxed">
            아직 즐겨찾기로 추가된 단어가 없어요.
            <br />
            단어 카드에서 별표(⭐) 표시를 누르면 여기에 추가되어 모아볼 수 있습니다!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {favoritedWords.map(w => (
              <div
                key={w.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:shadow-sm transition-all duration-200 flex justify-between items-center group"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold text-slate-800">{w.word}</span>
                    <span className="text-xs text-slate-400">[{w.pronunciation}]</span>
                  </div>
                  <span className="text-xs text-slate-500 block font-semibold mt-0.5">{w.meaning}</span>
                  <span className="text-[10px] text-indigo-500 font-bold block mt-1 bg-indigo-50 border border-indigo-100/50 px-1.5 py-0.5 rounded-md inline-block uppercase">{w.pattern}</span>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  {/* Sound play */}
                  <button
                    onClick={() => speakWord(w.word)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all cursor-pointer"
                    title="발음 재생"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Remove Star */}
                  <button
                    onClick={() => onRemoveStar(w.id)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-amber-500 hover:bg-amber-50 transition-all cursor-pointer"
                    title="즐겨찾기 삭제"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
