"use client";

import { selectFilteredTodos } from "@/lib/features/todos/selectors";
import { createTodoList, getSearch, setTodoCompleted } from "@/lib/features/todos/todoSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export default function TodoUI() {
    const dispatch = useDispatch();
    const [todoName, setTodoName] = useState('');
    const [todoPriority, setTodoPriority] = useState('Medium');
    const [searchText, setSearchText] = useState('')
    const todoList = useSelector(selectFilteredTodos)
    const search = useSelector((state: RootState) => state.todos.filters.search)

    const handleOnchangeTodoName = (e: any) => {
        setTodoName(e.target.value)
    }

    const prioritylist = [
        { value: 'High', title: 'High' },
        { value: 'Medium', title: 'Medium' },
        { value: 'Low', title: 'Low' },
    ]

    const handleOnchangeTodoPriority = (e: any) => {
        setTodoPriority(e.target.value)
    }

    const handleAddTodo = () => {
        if (!todoName.trim()) {
            alert("Please enter a task title");
            return;
        }

        dispatch(createTodoList({
            id: uuidv4(),
            todoName,
            priority: todoPriority,
            isCompleted: false,
            createdAt: Date.now()
        }));
        setTodoName('')
    };

    const handleOnchangeSearchText = (e: any) => {
        setSearchText(e.target.value)
        dispatch(getSearch(searchText))
    }

    const handleOnchangeIsCompleted =
        (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log({ id, isCompleted: e.target.checked })
            const isCompleted: any = e.target.checked
            dispatch(setTodoCompleted({ id, isCompleted: e.target.checked }))
        };


    return (
        <section className="mx-auto my-8 max-w-2xl rounded-xl border border-gray-200 bg-white shadow">
            <div className="p-4 border-b border-gray-200">
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                    onChange={handleOnchangeSearchText}
                    placeholder="Type a keyword..."
                    className="w-full px-3 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="p-4 border-b border-gray-200">
                <label className="block text-sm font-medium mb-2">Add task</label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        required
                        value={todoName}
                        onChange={handleOnchangeTodoName}
                        placeholder="Task title..."
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        aria-label="Priority"
                        className="px-3 py-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        defaultValue={todoPriority}
                        onChange={handleOnchangeTodoPriority}
                    >
                        {prioritylist.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddTodo}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                        Add
                    </button>
                </div>
            </div>
            <ul className="divide-y divide-gray-200">
                {todoList && todoList.map(item => {
                    const priorityColors: Record<string, string> = {
                        high: "bg-rose-100 text-rose-700 border border-rose-200",
                        medium: "bg-amber-100 text-amber-700 border border-amber-200",
                        low: "bg-emerald-100 text-emerald-700 border border-emerald-200",
                    };
                    return (
                        <li key={item.id} className="p-4 flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-gray-300"
                                checked={item.isCompleted}
                                onChange={handleOnchangeIsCompleted(item.id)}
                            />
                            <label
                                htmlFor={`todo-${item.id}`}
                                className={`flex-1 ${item.isCompleted ? "line-through text-gray-400" : ""}`}
                            >
                                {item.todoName}
                            </label>
                            <span
                                className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium ${priorityColors[item.priority.toLowerCase()] || ""}`}
                            >
                                {item.priority}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
