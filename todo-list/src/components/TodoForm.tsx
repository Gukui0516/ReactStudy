import React,{ useState } from 'react'

type TodoFormProps = {
    addTodo: (todo:string) => void
}

const TodoForm:React.FC<TodoFormProps> = ({addTodo}) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); //새로고침 방지
        if (!input.trim()) return; //빈 입력 무시
        addTodo(input);// 부모 컴포넌트로 데이터 전달
        setInput("");//입력 필드 초기화
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일을 입력하세요!"
                className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                추가
            </button>
        </form>
    )
}

export default TodoForm;