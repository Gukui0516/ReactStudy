import React from 'react';
import './App.css';
import ShortsPlayer from './components/ShortsPlayer';


const videos = [
  { id: 1, title: "Video 1", url: "/sample1.mp4" },
  { id: 2, title: "Video 2", url: "/sample2.mp4" },
  { id: 3, title: "Video 3", url: "/sample3.mp4" },
  { id: 3, title: "Video 4", url: "/sample4.mp4" },
];

const App:React.FC = () => {
  return (
    <div>
      <ShortsPlayer videos={videos} />
    </div>
  );
}

export default App;
