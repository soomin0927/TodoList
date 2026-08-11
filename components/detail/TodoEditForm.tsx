"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteTodo, updateTodo, uploadImage } from "../../lib/api";
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
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            let imageUrl = todo.imageUrl ?? "";

            if (image) {
                const result = await uploadImage(image);
                imageUrl = result.url;
            }

            await updateTodo(todo.id, {
                name,
                memo,
                isCompleted,
                imageUrl,
            });

            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);

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

            <div>
                <label htmlFor="image">이미지</label>

                <input
                    id="image"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) {
                            return;
                        }

                        const fileName = file.name;

                        if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
                            alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
                            e.target.value = "";
                            return;
                        }

                        if (file.size > 5 * 1024 * 1024) {
                            alert("이미지 파일은 5MB 이하만 업로드할 수 있습니다.");
                            e.target.value = "";
                            return;
                        }

                        setImage(file);
                    }}    
                    
                />

            </div>

            <button type="submit">
                -수정하기-
            </button>

            <button type="button" onClick={handleDelete}>
                X삭제하기X
            </button>
        </form>
    );
}