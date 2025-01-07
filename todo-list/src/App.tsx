import React from 'react';
import './App.css';
import TodoForm from './\bcomponents/TodoForm';
import TodoList from './\bcomponents/TodoList';


const App: React.FC = () => {
  const [todos, setTodos] = React.useState<string[]>([]);

  const addTodo = (todo: string) => {
    setTodos([...todos, todo]); //새로운 To-do 추가
  }

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index)); //해당 인덱스를 제외한 새 배열 생성
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;


// import Counter from './\bcomponents/Counter';

// const App: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <Counter />
//     </div>
//   );
// }

// import Greeting from './\bcomponents/Greeting';

// const App: React.FC = () => {
//   return (
//     <div>
//       <Greeting name = "Carter"/>
//     </div>
//   );
// }
