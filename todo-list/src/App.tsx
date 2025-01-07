import React from 'react';
import './App.css';
import Counter from './\bcomponents/Counter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Counter />
    </div>
  );
}

export default App;


// import Greeting from './\bcomponents/Greeting';

// const App: React.FC = () => {
//   return (
//     <div>
//       <Greeting name = "Carter"/>
//     </div>
//   );
// }
