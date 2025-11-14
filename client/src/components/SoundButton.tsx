import { useAudio } from "@/lib/stores/useAudio";

export function SoundButton() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <button 
      className="sound-button" 
      onClick={toggleMute}
      title={isMuted ? 'تشغيل الصوت' : 'إيقاف الصوت'}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}
