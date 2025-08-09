import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: string
    todoName: string
    priority: string
    isCompleted: boolean
    createdAt: number
}

interface TodosState {
    filters: { search: string }
    todoList: Todo[]
}

const initialState: TodosState = {
    filters: { search: '' },
    todoList: [
        { id: '1', todoName: 'Learn Redux', priority: 'High', isCompleted: false, createdAt: Date.now() },
        { id: '2', todoName: 'Learn NextJS', priority: 'Medium', isCompleted: false, createdAt: Date.now() },
        { id: '3', todoName: 'Learn PHP', priority: 'Low', isCompleted: false, createdAt: Date.now() },
    ]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createTodoList(state, action: PayloadAction<Todo>) {
            state.todoList = [action.payload, ...state.todoList]
        },
        getSearch(state, action: PayloadAction<string>) {
            state.filters.search = action.payload
        },
        setTodoCompleted(state, action: PayloadAction<{ id: string; isCompleted: any }>) {
            const { id, isCompleted } = action.payload;
            const todo = state.todoList.find((item) => item.id === id);
            if (todo) {
                todo.isCompleted = isCompleted;
            }
        },
    },
})

export const { createTodoList, getSearch, setTodoCompleted } = todoSlice.actions
export default todoSlice.reducer
