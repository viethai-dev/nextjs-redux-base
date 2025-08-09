// features/todos/selectors.ts
import { RootState } from "@/lib/store";

export const selectFilteredTodos = (state: RootState) => {
    const search = state.todos.filters.search.trim().toLowerCase();
    if (!search) return state.todos.todoList;
    return state.todos.todoList.filter((todo) =>
        todo.todoName.toLowerCase().includes(search)
    );
};
