import { useEffect } from "react";

const voiceLines = {
  yourTurn: "دورك",
  tryAgain: "حاول مرة ثانية",
  excellent: "أحسنت",
  player2Turn: "دور اللاعب الثاني",
  youWon: "رائع! فزت بالجولة",
  draw: "تعادل"
};

class ArabicVoiceManager {
  private synthesis: SpeechSynthesis | null = null;
  private arabicVoice: SpeechSynthesisVoice | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
      
      if (this.synthesis) {
        this.synthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (!this.synthesis) return;
    
    const voices = this.synthesis.getVoices();
    this.arabicVoice = voices.find(voice => voice.lang.startsWith('ar')) || null;
    
    console.log('Available Arabic voices:', voices.filter(v => v.lang.startsWith('ar')).map(v => v.name));
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  speak(text: string) {
    if (!this.synthesis || !this.enabled) {
      console.log('Voice skipped:', text);
      return;
    }

    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    if (this.arabicVoice) {
      utterance.voice = this.arabicVoice;
    }

    this.synthesis.speak(utterance);
  }

  speakYourTurn() {
    this.speak(voiceLines.yourTurn);
  }

  speakTryAgain() {
    this.speak(voiceLines.tryAgain);
  }

  speakExcellent() {
    this.speak(voiceLines.excellent);
  }

  speakPlayer2Turn() {
    this.speak(voiceLines.player2Turn);
  }

  speakYouWon() {
    this.speak(voiceLines.youWon);
  }

  speakDraw() {
    this.speak(voiceLines.draw);
  }
}

export const voiceManager = new ArabicVoiceManager();

export function VoiceManager() {
  useEffect(() => {
    voiceManager.enable();
    console.log("Voice manager initialized");
    
    return () => {
      voiceManager.disable();
    };
  }, []);

  return null;
}
