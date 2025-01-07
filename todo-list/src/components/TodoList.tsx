import React from 'react'
import { Todo } from '../types/Todo';

type TodoListProps = {
    todos: Todo[]
    deleteTodo: (index:number) => void; //삭제 함수 타입 추가
    toggleTodo: (index:number) => void; //토글 함수 타입 추가
}

const TodoList:React.FC<TodoListProps> = ({todos, deleteTodo, toggleTodo}) => {
  return (
    <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
            <li 
                key={index} 
                className= "mb-2 flex justify-between items-center">
                {/* 체크박스 */}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)} //체크시 토글 함수 호출
                    className="mr-2"
                />
                {/* 할 일 텍스트 */}
                <span className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : ""}`}>
                    {todo.text}
                </span>
                {/* 삭제 버튼 */}
                <button
                    className = "ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteTodo(index)} //클릭시 삭제 함수 호출
                >
                    X
                </button>
            </li>
        ))}
    </ul>
  )
}

export default TodoList;