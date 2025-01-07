import React, {useState} from 'react'

const Counter:React.FC = () => {
    //useState를 사용하여 count 상태와 setCount 업데이트 함수를 정의
    const [count, setCount] = useState(0)

    return (
        <div className="text-center p-4">
            <h1 className="text-2xl font-bold">Counter</h1>
            <p className="text-lg">Current Count: {count}</p>
            <div className="mt-4">
                {/* Increase 버튼 */}
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={(() => setCount(count + 1))}
                >
                    Increase
                </button>

                {/* Decrease 버튼 */}
                <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={(() => setCount(count - 1))}
                >
                    Decrease
                </button>

                {/* Reset 버튼 */}
                <button
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={(() => setCount(0))}
                >
                    Reset
                </button>
            </div>
        </div>
   )
}

export default Counter;