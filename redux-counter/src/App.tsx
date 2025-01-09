import React from 'react';
import Counter from './components/Counter';
import { store } from './Redux/Store/store';
import './App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
