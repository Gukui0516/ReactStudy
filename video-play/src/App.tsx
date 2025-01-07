import React from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';

const App:React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <VideoPlayer url="/sample1.mp4" title="영혼의 가위바위보 에어팟 몰아주기"/>
    </div>
  );
}

export default App;
