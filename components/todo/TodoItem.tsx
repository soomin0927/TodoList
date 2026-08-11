"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateTodo } from "../../lib/api";
import { TodoListItem } from "../../types/todo";

interface TodoItemProps {
    todo: TodoListItem;
}

export default function TodoItem({ todo }: TodoItemProps) {

    const router = useRouter();

    // console.log("Todo : ", todo);

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
        <li className= {`
                flex 
                mx-auto
                items-center 
                gap-4 
                my-2 
                px-3
                w-[800px] // 임의로 길이 설정 (후에 변경 예정)
                h-[50px]
                border-2 border-slate-900
                rounded-full
                ${todo.isCompleted ? "bg-violet-100" : "bg-white"}
            `}
        >
            <button 
                type="button"
                onClick={handleToggle}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full "
            >
                {/* {todo.isCompleted ? "✓" : "o"} */}
                {todo.isCompleted ? (
                    <Image
                        src="/icons/todo_check.png"
                        alt="완료"
                        width={32}
                        height={32}
                    />
                    ) : (
                    <Image
                        src="/icons/todo_uncheck.png"
                        alt="미완료"
                        width={32}
                        height={32}
                    />
                )}
            </button>

            <Link 
                href= {`/items/${todo.id}`}
                className={`
                    text-base 
                    text-slate-800
                    ${todo.isCompleted ? "line-through text-slate-800" : ""}
                `}
            >
                {todo.name}
            </Link>
        </li>
    )

}