import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../Redux/Actions/actions';
import { RootState } from '../Redux/Store/store'

const Counter:React.FC = () => {
    const [inputValue, setInputValue] = useState<number>(0);// 입력값 상태
    const count = useSelector((state: RootState) => state.count);
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10) || 0;//숫자 파싱
        setInputValue(value);
    };


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
            <div className="space-x-4">
                <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="border border-gray-3200 rounded p-2 w-16 text-center"
                        placeholder="Enter a number"
                    />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                    onClick={() => dispatch(increment(inputValue))}
                >
                    Increment
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => dispatch(decrement(inputValue))}
                >
                    Decrement
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" 
                    onClick={() => dispatch(reset())}
                >
                    Reset
                </button>
                
            </div>

        </div>
    )
}

export default Counter;