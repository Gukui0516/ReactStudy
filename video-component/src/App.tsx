import React from "react";
import Player from "./components/videoPlayer";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <div className="absolute bottom-6 left-1 text-white text-xl px-4 py-2 rounded-lg z-10">
          쇼미더머니 씹어먹는 썬라이즈
        </div>
        <Player
          src="http://localhost:8080/hObAvaxlQ7o.mp4-manifest.mpd"
          autoplay={false}
        />
      </div>
    </div>
  );
}

export default App;
