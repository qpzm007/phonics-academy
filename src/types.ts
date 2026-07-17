export type MainCategoryType = 'short' | 'long' | 'consonant' | 'vowel';

export interface PhonicsWord {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  pattern: string; // e.g., '단모음 A (애)', '장모음 a_e (에이)'
  patternGroup: string; // e.g., 'A', 'a_e', 'SM', 'ee/ea'
  learningPoint: string; // Explanation or notes from video
  audioSpeed?: number;
}

export interface PhonicsGroup {
  id: string;
  name: string; // e.g., "단모음 A (애)", "SM (스무)"
  patternKey: string; // e.g., "A", "SM"
  description: string; // Explanation of this pattern group
  words: PhonicsWord[];
}

export interface PhonicsCategory {
  id: MainCategoryType;
  title: string;
  koreanTitle: string;
  description: string;
  concept: string; // e.g., "모음(A,E,I,O,U)이 단어 내에서 각각 짧게 '애, 에, 이, 아, 어'로 소리 나는 경우"
  groups: PhonicsGroup[];
}

export interface UserProgress {
  completedWords: string[]; // List of word IDs completed/mastered
  starredWords: string[]; // List of favorited/bookmarked word IDs
  quizScores: {
    date: string;
    score: number;
    total: number;
    category: string;
  }[];
  spellingHighScore: number;
}
