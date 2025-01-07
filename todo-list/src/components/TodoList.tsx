import React from 'react'

type TodoListProps = {
    todos: string[]
    deleteTodo: (index:number) => void; //삭제 함수 타입 추가
}

const TodoList:React.FC<TodoListProps> = ({todos, deleteTodo}) => {
  return (
    <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
            <li key={index} className="mb-2">
                <span>{todo}</span>
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