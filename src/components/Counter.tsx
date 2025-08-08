'use client';

import { useAppDispatch, useAppSelector } from '../store/store';
import { increment, decrement, incrementByAmount, reset } from '../slices/counterSlice';
import { useState } from 'react';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(2);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Redux Counter Demo</h2>
        
        <div className="text-6xl font-bold text-blue-600 mb-6">{count}</div>
        
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            -
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            +
          </button>
        </div>
        
        <div className="flex gap-2 justify-center mb-4">
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-20 text-center"
          />
          <button
            onClick={() => dispatch(incrementByAmount(incrementAmount))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Amount
          </button>
        </div>
        
        <button
          onClick={() => dispatch(reset())}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
