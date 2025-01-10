import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import "./App.css";

interface State {
  value: number;
}

interface Action {
  type: string;
  step: number;
}

const initalState: State = { value: 0 };

function reducer(state: State = initalState, action: Action) {
  if (action.type === "up") {
    return { ...state, value: state.value + action.step };
  }
  return state;
}

const store = createStore(reducer, initalState);

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: State) => state.value);
  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          dispatch({ type: "up", step: 2 });
        }}
      >
        +
      </button>
      <span className="text-2xl">{count}</span>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
