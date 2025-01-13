import React, { useRef, useEffect, useState } from "react";
import dashjs from "dashjs";

interface PlayerProps {
  src: string;
  autoplay?: boolean;
}

const Player: React.FC<PlayerProps> = ({ src, autoplay = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [mousePosition, setMousePosition] = useState<
    "top" | "middle" | "bottom" | null
  >(null);
  const [showControls, setShowControls] = useState(true);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, autoplay);

      // 음소거 설정
      videoRef.current.muted = true;

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration);
        }
      };

      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      // 자동재생 처리
      if (autoplay) {
        setTimeout(() => {
          videoRef.current
            ?.play()
            .then(() => setIsPlaying(true))
            .catch((error) => console.error("Autoplay failed:", error));
        }, 100);
      }

      return () => {
        player.destroy();
        videoRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [src, autoplay]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientY, currentTarget } = event;
    const height = currentTarget.offsetHeight;

    if (clientY < height * 0.3) {
      setMousePosition("top");
    } else if (clientY > height * 0.7) {
      setMousePosition("bottom");
    } else {
      setMousePosition("middle");
    }

    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      setShowPlayPauseButton(true);
      setTimeout(() => setShowPlayPauseButton(false), 1000);

      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = parseFloat(event.target.value);
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      // 비디오를 처음으로 돌리고 자동재생
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        videoRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error during auto-replay:", error));
      }, 100); // 짧은 지연 시간 추가
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden shadow-lg w-full h-full"
      onMouseMove={handleMouseMove}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlayPause}
        onEnded={handleVideoEnded}
        autoPlay={autoplay}
      />

      {/* Central Play/Pause Button */}
      <button
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-kakao-yellow text-[3rem] rounded-full w-[6.25rem] h-[6.25rem] flex items-center justify-center transition-opacity duration-1000 ${
          showPlayPauseButton
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={togglePlayPause}
      >
        {isPlaying ? "⏸︎" : "▶"}
      </button>

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 text-white p-2 transition-opacity duration-1000 ${
          mousePosition === "bottom" && showControls
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center space-x-4">
          {/* Progress Bar */}
          <input
            type="range"
            className="w-full h-1 bg-transparent rounded-lg outline-none accent-kakao-yellow"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
          />

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <span>🔊</span>
            <input
              type="range"
              className="h-1 w-24 accent-kakao-yellow"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
