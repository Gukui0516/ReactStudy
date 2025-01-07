import React from 'react'

type TodoListProps = {
    todos: string[]
}

const TodoList:React.FC<TodoListProps> = ({todos}) => {
  return (
    <ul className="list-disc pl-5">
        {todos.map((todo, index) => (
            <li key={index} className="mb-2">
                {todo}
            </li>
        ))}
    </ul>
  )
}

export default TodoList;