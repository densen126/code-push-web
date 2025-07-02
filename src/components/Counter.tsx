import React from 'react';
import { increment, decrement } from '../store/slices/counter/counterSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const Counter: React.FC = () => {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl mb-2">Counter</h2>
            <p className="mb-4 text-lg">当前值：{count}</p>
            <div className="space-x-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => dispatch(increment())}
                >
                    +1
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => dispatch(decrement())}
                >
                    -1
                </button>
            </div>
        </div>
    );
};

export default Counter;
