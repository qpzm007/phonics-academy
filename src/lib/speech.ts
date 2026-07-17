/**
 * Helper utility to manage text-to-speech for phonics words.
 * Uses the Web Speech API (window.speechSynthesis).
 */

export interface SpeechOptions {
  rate?: number; // Speech speed (0.5 to 2.0, default 1.0)
  pitch?: number; // Pitch (0.5 to 2.0, default 1.0)
  voiceURI?: string; // Optional preferred voice URI
}

export function speakWord(word: string, options: SpeechOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject(new Error('Speech synthesis is not supported in this environment.'));
      return;
    }

    // Cancel current speaking before starting a new one
    window.speechSynthesis.cancel();

    // Clean word for TTS if needed (e.g., removing brackets)
    const cleanedText = word.replace(/_/, ' ').trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'en-US';
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;

    // Try to find a high-quality US English voice if available
    const voices = window.speechSynthesis.getVoices();
    if (options.voiceURI) {
      const selected = voices.find(v => v.voiceURI === options.voiceURI);
      if (selected) utterance.voice = selected;
    } else {
      // Find default en-US voice
      const enVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google')) ||
                      voices.find(v => v.lang.startsWith('en-US')) ||
                      voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Returns a list of available English voices in the browser.
 */
export function getEnglishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
}
