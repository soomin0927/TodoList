"use client";

import { useRouter } from "next/navigation";
import { updateTodo } from "../../lib/api";
import { TodoListItem } from "../../types/todo";

interface TodoItemProps {
    todo: TodoListItem;
}

export default function TodoItem({ todo }: TodoItemProps) {

    const router = useRouter();

    const handleToggle = async () => {

        try {
            await updateTodo(todo.id, {
                isCompleted: !todo.isCompleted,
            });

            router.refresh();
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <li>
            <button type="button" onClick={handleToggle}>
                {todo.isCompleted ? "✓" : "o"}
            </button>

            <span> {todo.name} </span>
        </li>
    )

}