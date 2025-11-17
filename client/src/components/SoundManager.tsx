import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setHitSound, setSuccessSound, setClickSound } = useAudio();

  useEffect(() => {
    const hitAudio = new Audio("/sounds/hit.mp3");
    hitAudio.volume = 0.3;
    hitAudio.preload = "auto";
    setHitSound(hitAudio);

    const successAudio = new Audio("/sounds/success.mp3");
    successAudio.volume = 0.5;
    successAudio.preload = "auto";
    setSuccessSound(successAudio);

    const clickAudio = new Audio("/sounds/hit.mp3");
    clickAudio.volume = 0.4;
    clickAudio.preload = "auto";
    setClickSound(clickAudio);

    console.log("Sound manager initialized with click sounds");
  }, [setHitSound, setSuccessSound, setClickSound]);

  return null;
}
