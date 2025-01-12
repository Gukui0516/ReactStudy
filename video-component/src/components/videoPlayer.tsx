import React, { useRef, useEffect, useState } from "react";
import dashjs from "dashjs";

interface PlayerProps {
  src: string; // MPEG-DASH manifest URL
  autoplay?: boolean;
}

const Player: React.FC<PlayerProps> = ({ src, autoplay = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 볼륨 상태
  const [showControls, setShowControls] = useState(true); // 컨트롤 표시 상태
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, autoplay);

      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          const { videoWidth, videoHeight, duration } = videoRef.current;
          setVideoDimensions({ width: videoWidth, height: videoHeight });
          setDuration(duration);
        }
      };

      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        player.destroy();
        videoRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [src, autoplay]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false); // 일시정지 상태 업데이트
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true)) // 재생 상태 업데이트
          .catch((error) => console.error("Error playing video:", error));
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
      videoRef.current.volume = newVolume; // 비디오 볼륨 변경
    }
    setVolume(newVolume); // 상태 업데이트
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // 처음으로 되감기
      videoRef.current.play(); // 비디오 자동 재생
      setIsPlaying(true); // 재생 상태 업데이트
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

  const handleMouseMove = () => {
    setShowControls(true); // 컨트롤 표시
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current); // 기존 타이머 초기화
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false); // 1초 후 컨트롤 숨기기
    }, 1000);
  };

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden shadow-lg"
      style={{
        width: `${videoDimensions.width}px`,
        height: `${videoDimensions.height}px`,
      }}
      onMouseMove={handleMouseMove} // 마우스 이동 시 컨트롤 표시
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlayPause}
        onEnded={handleVideoEnded} // 자동 재생 처리
      />

      {/* Central Play/Pause Button */}
      <button
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-kakao-yellow text-[3rem] rounded-full w-[6.25rem] h-[6.25rem] flex items-center justify-center hover:bg-black/50 transition-opacity duration-1000 ${
          showControls
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
          showControls ? "opacity-100" : "opacity-0"
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
