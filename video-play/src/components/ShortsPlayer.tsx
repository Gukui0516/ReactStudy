import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

interface Video {
  id: number;
  title: string;
  url: string;
}

interface ShortsPlayerProps {
  videos: Video[];
}

const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 동영상을 참조

  useEffect(() => {
    const observerOptions = {
      root: null, // 브라우저 뷰포트 기준
      rootMargin: "0px",
      threshold: 0.5, // 50% 이상 보일 때 감지
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setCurrentVideoIndex(index); // 현재 보이는 동영상의 인덱스 설정
        }
      });
    }, observerOptions);

    // 각 동영상 요소를 옵저버에 등록
    playerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      // 컴포넌트 언마운트 시 옵저버 해제
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll bg-black">
      {videos.map((video, index) => (
        <div
          key={video.id}
          ref={(el) => (playerRefs.current[index] = el)}
          data-index={index}
          className="w-full h-screen flex items-center justify-center"
        >
          <ReactPlayer
            url={video.url}
            playing={currentVideoIndex === index} // 현재 동영상만 재생
            controls={false} // 컨트롤 비활성화
            width="100%"
            height="100%"
            className="react-player"
            config={{
              file: {
                attributes: {
                  style: {
                    objectFit: "cover", // 화면 꽉 채우기
                  },
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ShortsPlayer;
