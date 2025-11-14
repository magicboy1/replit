import { useEffect, useState } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setHitSound, setSuccessSound, setBackgroundMusic, isMuted } = useAudio();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const hitAudio = new Audio("/sounds/hit.mp3");
    hitAudio.volume = 0.3;
    hitAudio.preload = "auto";
    setHitSound(hitAudio);

    const successAudio = new Audio("/sounds/success.mp3");
    successAudio.volume = 0.5;
    successAudio.preload = "auto";
    setSuccessSound(successAudio);

    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.volume = 0.2;
    bgMusic.loop = true;
    bgMusic.preload = "auto";
    setBackgroundMusic(bgMusic);

    const handleFirstInteraction = () => {
      setHasInteracted(true);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    console.log("Sound manager initialized");

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [setHitSound, setSuccessSound, setBackgroundMusic]);

  useEffect(() => {
    if (!hasInteracted) return;

    const { backgroundMusic } = useAudio.getState();
    
    if (backgroundMusic) {
      if (!isMuted) {
        backgroundMusic.play().catch(error => {
          console.log("Background music play prevented:", error);
        });
      } else {
        backgroundMusic.pause();
      }
    }
  }, [isMuted, hasInteracted]);

  return null;
}
