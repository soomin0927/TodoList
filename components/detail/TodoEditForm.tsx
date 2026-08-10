"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateTodo } from "../../lib/api";
import { Todo } from "../../types/todo";

interface TodoEditFormProps {
    todo: Todo; 
}

export default function TodoEditForm({
    todo,
}: TodoEditFormProps) {

    const router = useRouter();

    const [name, setName] = useState(todo.name);
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
    const [memo, setMemo] = useState(todo.memo ?? "");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateTodo(todo.id, {
                name,
                memo,
                isCompleted,
            });

            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">할 일 : </label>

                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <button
                    type="button"
                    onClick={() => setIsCompleted(false)}
                >
                    진행 중
                </button>

                <button
                    type="button"
                    onClick={() => setIsCompleted(true)}
                >
                    완료
                </button>
            </div>

            <div>
                <label htmlFor="memo">메모</label>

                <textarea
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
            </div>

            <button type="submit">
                -수정하기-
            </button>
        </form>
    );
}