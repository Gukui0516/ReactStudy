import React from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
    url: string; //동영상 파일 경로
    title: string; //동영상 제목
}


const VideoPlayer:React.FC<VideoPlayerProps> = ({url, title}) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <ReactPlayer
            url={url}
            controls
            width="30%"
            height="auto"
            className="react-player"
        />
    </div>
  )
}

export default VideoPlayer;