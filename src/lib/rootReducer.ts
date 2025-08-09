import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from '@/lib/features/todos/todoSlice';

const rootReducer = combineReducers({
    todos: todosReducer
});

export default rootReducer;
