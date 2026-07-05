import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

function MusicControls({ audioRef }) {
  const [volume, setVolume] = useState(35);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, audioRef]);

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999998] flex items-center gap-3 overflow-hidden rounded-full border border-cyan-300/25 bg-black/55 py-3 backdrop-blur-xl shadow-[0_0_30px_rgba(0,245,255,0.18)] transition-all duration-300 ease-out ${
        isOpen ? "w-64 px-4" : "w-14 px-2"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={toggleMute}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 transition hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_20px_rgba(0,245,255,0.65)]"
        aria-label="Controlar volumen"
      >
        {isMuted || volume === 0 ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>

      <div
        className={`flex items-center gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="music-volume-slider w-28"
        />

        <span className="w-10 text-right text-xs font-semibold text-cyan-100/80">
          {isMuted ? "0%" : `${volume}%`}
        </span>
      </div>
    </div>
  );
}

export default MusicControls;