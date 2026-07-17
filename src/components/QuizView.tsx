import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle2, AlertCircle, HelpCircle, RefreshCw, Award, ArrowRight, Play, BookOpen } from 'lucide-react';
import { PHONICS_DATA, ALL_PHONICS_WORDS } from '../data';
import { PhonicsWord } from '../types';
import { speakWord } from '../lib/speech';

interface QuizQuestion {
  type: 'listening' | 'meaning' | 'pattern';
  word: PhonicsWord;
  text: string; // The question text
  options: string[]; // 4 choices (usually the english words)
  correctAnswer: string;
}

interface QuizViewProps {
  onAddScore: (score: number, total: number, category: string) => void;
}

export default function QuizView({ onAddScore }: QuizViewProps) {
  const [quizCategory, setQuizCategory] = useState<string>('all');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizHistory, setQuizHistory] = useState<{ question: QuizQuestion; chosen: string; isCorrect: boolean }[]>([]);

  // Sound prompt helper
  const playCurrentQuestionSound = () => {
    const q = questions[currentQuestionIndex];
    if (q && (q.type === 'listening' || q.type === 'meaning')) {
      speakWord(q.word.word);
    }
  };

  // Generate 10 random questions
  const startNewQuiz = () => {
    let pool: PhonicsWord[] = [];
    let categoryLabel = '전체 단어';

    if (quizCategory === 'all') {
      pool = [...ALL_PHONICS_WORDS];
      categoryLabel = '전체 단어';
    } else {
      const cat = PHONICS_DATA.find(c => c.id === quizCategory);
      if (cat) {
        pool = cat.groups.flatMap(g => g.words);
        categoryLabel = cat.koreanTitle;
      }
    }

    if (pool.length < 4) return; // safety check

    // Shuffle pool to pick 10 words (or all if pool is smaller than 10)
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const quizSize = Math.min(10, shuffledPool.length);
    const selectedWords = shuffledPool.slice(0, quizSize);

    // Build questions
    const generatedQuestions: QuizQuestion[] = selectedWords.map((word, index) => {
      // Determine question type cyclically or randomly
      const randVal = Math.random();
      let type: 'listening' | 'meaning' | 'pattern' = 'listening';
      if (randVal < 0.35) {
        type = 'meaning';
      } else if (randVal < 0.7) {
        type = 'pattern';
      }

      // Find distractors
      // Ideally distractors are from the same overall pool
      const potentialDistractors = pool.filter(w => w.id !== word.id);
      const shuffledDistractors = [...potentialDistractors].sort(() => Math.random() - 0.5);
      const distractors = shuffledDistractors.slice(0, 3).map(w => w.word);

      // Assemble options
      const options = [word.word, ...distractors].sort(() => Math.random() - 0.5);

      let text = '';
      let correctAnswer = word.word;

      if (type === 'listening') {
        text = '소리를 잘 듣고, 알맞은 영단어 스펠링을 골라보세요!';
      } else if (type === 'meaning') {
        text = `다음 뜻을 가진 영단어는 무엇일까요?\n▶ 뜻: "${word.meaning}" (발음: ${word.pronunciation})`;
      } else {
        text = `"${word.pattern}" 발음 규칙에 속하는 영단어는 다음 중 무엇일까요?`;
        // Pattern question options need to be the actual words, and only the correct word should belong to this pattern Group
        // Let's replace distractor choices with words that definitely DO NOT belong to this pattern group
        const invalidDistractors = ALL_PHONICS_WORDS
          .filter(w => w.patternGroup !== word.patternGroup)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.word);

        const patternOptions = [word.word, ...invalidDistractors].sort(() => Math.random() - 0.5);
        return {
          type,
          word,
          text,
          options: patternOptions,
          correctAnswer: word.word
        };
      }

      return {
        type,
        word,
        text,
        options,
        correctAnswer
      };
    });

    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizHistory([]);
    setIsQuizStarted(true);

    // Auto voice output on first question if listening type
    setTimeout(() => {
      if (generatedQuestions[0] && generatedQuestions[0].type === 'listening') {
        speakWord(generatedQuestions[0].word.word);
      }
    }, 500);
  };

  const handleSelectAnswer = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      // Praise sound / effect
      speakWord('Excellent!');
    } else {
      speakWord('Try again!');
    }

    setQuizHistory(prev => [
      ...prev,
      {
        question: currentQuestion,
        chosen: selectedAnswer,
        isCorrect
      }
    ]);

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Auto speech play for next question if type is listening
      const nextQ = questions[nextIndex];
      setTimeout(() => {
        if (nextQ && nextQ.type === 'listening') {
          speakWord(nextQ.word.word);
        }
      }, 400);
    } else {
      // Quiz Complete! Save Score
      let categoryLabel = '전체 단어';
      if (quizCategory !== 'all') {
        const cat = PHONICS_DATA.find(c => c.id === quizCategory);
        if (cat) categoryLabel = cat.koreanTitle;
      }
      onAddScore(score, questions.length, categoryLabel);
    }
  };

  const quizCompleted = quizHistory.length === questions.length && questions.length > 0;

  return (
    <div className="space-y-6" id="quiz-main-view">
      {!isQuizStarted ? (
        /* Intro screen */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-7 h-7 text-amber-500" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">파닉스 마스터 도전!</h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
              지금까지 배운 파닉스 발음 규칙과 어휘를 기반으로 재미있는 스피드 퀴즈에 도전해 보세요! 10문제가 출제됩니다.
            </p>
          </div>

          {/* Category Chooser */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">테스트할 영역 선택</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => setQuizCategory('all')}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  quizCategory === 'all'
                    ? 'border-indigo-500 bg-indigo-50/30 text-indigo-900 font-bold'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50/20'
                }`}
                id="quiz-cat-all"
              >
                <span className="block text-sm">🎒 종합 파닉스</span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">전체 118단어 무작위 출제</span>
              </button>

              {PHONICS_DATA.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setQuizCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    quizCategory === cat.id
                      ? 'border-indigo-500 bg-indigo-50/30 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50/20'
                  }`}
                  id={`quiz-cat-${cat.id}`}
                >
                  <span className="block text-sm">💡 {cat.koreanTitle} 영역</span>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{cat.title} 단어에서 출제</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startNewQuiz}
            className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm cursor-pointer"
            id="start-quiz-btn"
          >
            퀴즈 풀기 시작!
          </button>
        </div>
      ) : !quizCompleted ? (
        /* Active Question Screen */
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress header */}
          <div className="flex justify-between items-center bg-white rounded-2xl px-5 py-3 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">
              문제 {currentQuestionIndex + 1} / {questions.length}
            </span>

            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
              맞춘 개수: {score}개
            </span>
          </div>

          {/* Question Box Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center space-y-6">
            <div className="flex justify-center">
              <span className="text-3xl">
                {questions[currentQuestionIndex].type === 'listening' ? '🔊' : '📝'}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-indigo-500 tracking-wider uppercase font-mono">
                {questions[currentQuestionIndex].type === 'listening' && "듣기 퀴즈 (Listening)"}
                {questions[currentQuestionIndex].type === 'meaning' && "뜻 풀이 퀴즈 (Definition)"}
                {questions[currentQuestionIndex].type === 'pattern' && "파닉스 규칙 퀴즈 (Phonics)"}
              </h3>
              <p className="text-base font-bold text-slate-800 leading-relaxed whitespace-pre-line">
                {questions[currentQuestionIndex].text}
              </p>
            </div>

            {/* Listening Play Button for speech synthesis */}
            {questions[currentQuestionIndex].type === 'listening' && (
              <button
                onClick={playCurrentQuestionSound}
                className="mx-auto flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-indigo-50 hover:bg-indigo-100/60 text-indigo-700 border border-indigo-100 font-bold text-sm transition-all duration-300 hover:scale-102 active:scale-95 cursor-pointer"
                id="listening-play-btn"
              >
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>영어 발음 다시 듣기</span>
              </button>
            )}

            {/* Multiple choices */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {questions[currentQuestionIndex].options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAns = option === questions[currentQuestionIndex].correctAnswer;

                let optionClass = "p-3.5 rounded-xl border text-center font-bold text-base tracking-wide transition-all duration-300 cursor-pointer ";
                if (isAnswerSubmitted) {
                  if (isCorrectAns) {
                    optionClass += "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs";
                  } else if (isSelected) {
                    optionClass += "bg-rose-50 border-rose-300 text-rose-700 shadow-xs";
                  } else {
                    optionClass += "bg-slate-50/50 border-slate-100 text-slate-300 opacity-60";
                  }
                } else {
                  if (isSelected) {
                    optionClass += "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs";
                  } else {
                    optionClass += "bg-white border-slate-200 text-slate-700 hover:bg-slate-50/50 hover:border-slate-300";
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectAnswer(option)}
                    className={optionClass}
                    id={`quiz-option-${option}`}
                  >
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer detail message */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-left border flex items-start gap-2.5 ${
                    selectedAnswer === questions[currentQuestionIndex].correctAnswer
                      ? 'bg-emerald-50/30 border-emerald-100 text-emerald-800'
                      : 'bg-rose-50/30 border-rose-100 text-rose-800'
                  }`}
                >
                  {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-extrabold text-sm block">
                      {selectedAnswer === questions[currentQuestionIndex].correctAnswer
                        ? '정답입니다! 참 잘했어요! 🎉'
                        : `아쉬워요! 정답은 [${questions[currentQuestionIndex].correctAnswer}] 입니다.`}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold block mt-1 leading-normal">
                      💡 {questions[currentQuestionIndex].word.word} [{questions[currentQuestionIndex].word.pronunciation}] : {questions[currentQuestionIndex].word.meaning}
                      <br />
                      포인트: {questions[currentQuestionIndex].word.learningPoint}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                id="submit-answer-btn"
              >
                정답 제출하기
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-wide flex items-center gap-1 transition-all duration-200 cursor-pointer"
                id="next-question-btn"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? "결과 보기" : "다음 문제로"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Complete Results page with detailed feedback */
        <div className="max-w-xl mx-auto space-y-6" id="quiz-results-screen">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-center space-y-6">
            <span className="text-5xl block animate-bounce">🏆</span>

            <div>
              <h2 className="text-xl font-bold text-slate-800">테스트 종료! 수고하셨습니다.</h2>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                실력 점검 완료! 어떤 파닉스 영단어를 잘 이해하고 있고, 부족한지 아래에서 점검해 보세요.
              </p>
            </div>

            {/* Score Ring */}
            <div className="inline-block relative">
              <div className="w-28 h-28 rounded-full border-4 border-slate-100 flex items-center justify-center bg-slate-50 shadow-inner mx-auto">
                <div className="text-center">
                  <span className="text-3xl font-black text-indigo-600 block leading-tight">{score}</span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest text-[9px]">/ {questions.length} 정답</span>
                </div>
              </div>
            </div>

            {/* Playful evaluation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto">
              <span className="text-sm font-bold text-slate-700 block">
                {score === questions.length ? "🎖️ 파닉스 퍼펙트 신동 탄생! 최고예요!" :
                 score >= 8 ? "🌟 대단한 파닉스 우수 장학생이군요!" :
                 score >= 5 ? "👍 파닉스의 기초가 완벽히 잡혀 가고 있어요!" :
                 "✏️ 다시 한번 단어판을 보며 소리를 복습해 볼까요?"}
              </span>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <button
                onClick={() => setIsQuizStarted(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                id="back-quiz-select"
              >
                다른 세트 도전
              </button>

              <button
                onClick={startNewQuiz}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-all duration-200 cursor-pointer"
                id="retry-quiz-btn"
              >
                한 번 더 풀기 🔄
              </button>
            </div>
          </div>

          {/* ODAH NOTE (Mistakes reviewer) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-600 flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>이번 퀴즈 꼼꼼하게 복습하기 (오답노트)</span>
            </h3>

            <div className="space-y-3">
              {quizHistory.map((hist, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between md:items-center gap-3.5 transition-all duration-200 ${
                    hist.isCorrect
                      ? 'bg-emerald-50/10 border-slate-100 hover:border-emerald-100'
                      : 'bg-rose-50/15 border-rose-100 hover:bg-rose-50/20'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${hist.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {hist.isCorrect ? '정답' : '오답'}
                      </span>
                      <span className="text-base font-extrabold text-slate-800">
                        {hist.question.word.word}
                      </span>
                      <span className="text-xs text-slate-500">[{hist.question.word.pronunciation}]</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-normal">
                      <span className="font-bold">뜻:</span> {hist.question.word.meaning}
                      <span className="mx-2">|</span>
                      <span className="font-bold">선택한 답:</span> <span className={hist.isCorrect ? 'text-emerald-600' : 'text-rose-600 font-bold'}>{hist.chosen}</span>
                    </p>

                    <p className="text-[11px] text-indigo-500 bg-indigo-50/20 px-2 py-1.5 rounded-lg font-medium border border-indigo-50/30">
                      💡 {hist.question.word.learningPoint}
                    </p>
                  </div>

                  <button
                    onClick={() => speakWord(hist.question.word.word)}
                    className="self-end md:self-auto px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>발음 다시 듣기</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
