"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteTodo, updateTodo, uploadImage } from "../../lib/api";
import { Todo } from "../../types/todo";

interface TodoEditFormProps {
    todo: Todo; 
}

// 상세페이지 수정 폼 
export default function TodoEditForm({
    todo,
}: TodoEditFormProps) {

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(todo.name);
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
    const [memo, setMemo] = useState(todo.memo ?? "");
    const [image, setImage] = useState<File | null>(null);
    const [inputWidth, setInputWidth] =useState(0);

    const isChanged =
        name !== todo.name ||
        isCompleted !== todo.isCompleted ||
        memo !== (todo.memo ?? "") ||
        image !== null;

    useEffect(() => {
        if (!inputRef.current) return;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return;

        context.font = getComputedStyle(inputRef.current).font;

        const textWidth = context.measureText(name).width;

        setInputWidth(textWidth + 8);
    }, [name]);
    

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
            <div
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-4
                    rounded-full
                    border-2 border-slate-900
                    px-6
                    py-3
                "
            >
                {/* 체크 버튼 */}
                <button
                    type="button"
                    onClick={() => setIsCompleted(!isCompleted)}
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                    "
                >
                {isCompleted ? (
                    <Image
                            src="/icons/todo_check.png"
                            alt="완료"
                            width={32}
                            height={32}
                        />
                    ) : (
                        <Image
                            src="/icons/todo_uncheck.png"
                            alt="진행 중"
                            width={32}
                            height={32}
                        />
                )}
                </button>

                {/* Todo 이름 */}
                <div className="w-fit border-b-1 border-slate-900">
                    <input
                        ref= {inputRef}
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: `${inputWidth}px` }}
                        className="
                            bg-transparent
                            text-center
                            text-xl
                            font-bold
                            text-slate-900
                            outline-none
                        "
                        />
                </div>
            </div>


            <div className="mt-7 flex flex-col gap-6 lg:flex-row"> {/* 메모 / 이미지 */}
                
                {/* ----- 이미지 ----- */}
                <div className="
                        relative 
                        h-[311px]
                        min-h-[311px]
                        flex-1 
                        border-2
                        border-dashed
                        border-slate-300
                        rounded-lg 
                        min-w-0
                    "
                >
                    <label 
                        htmlFor="image"
                        className="
                            flex
                            absolute
                            m-auto
                            h-full
                            w-full
                            items-center
                            justify-center
                            cursor-pointer
                        "
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="선택한 이미지"
                                className="h-full w-full rounded-lg object-cover"
                            />
                            ) : todo.imageUrl ? (
                                <img
                                    src={todo.imageUrl}
                                    alt={todo.name}
                                    className="h-full w-full rounded-lg object-cover"
                                />
                            ) : (
                                <Image
                                    src="/icons/add_photo.png"
                                    alt="이미지 추가"
                                    width={64}
                                    height={64}
                                />
                        )}
                    </label>

                    <input
                        id="image"
                        type="file" 
                        accept="image/*"
                        className="hidden"
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

                    {/* 오른쪽 아래 + 버튼 */}
                    <label
                        htmlFor="image"
                        className= {`
                            absolute
                            bottom-4
                            right-4
                            flex
                            h-14
                            w-14    
                            cursor-pointer
                            items-center
                            justify-center
                            border-2
                            rounded-full
                            text-2xl
                            text-white
                            ${
                                image || todo.imageUrl
                                    ? "bg-slate-900/50 border-slate-900"
                                    : "bg-slate-200"
                            }
                        `}
                    >
                        {image || todo.imageUrl ? (
                            <Image
                                src="/icons/edit.png"
                                alt="이미지 수정"
                                width={20}
                                height={20}
                                />
                            ) : (
                                <img src="/icons/plus_gray.png" alt="파일 추가하기 버튼" width={18} height={18}  />
                        )}
                    </label>

                </div>


                {/* ----- 메모 ----- */}
                <div className="
                        h-[311px]
                        min-h-[311px]
                        relative
                        flex-1
                        overflow-hidden
                        rounded-lg
                        min-w-0

                    "
                >
                    <Image
                        src="/images/memo.png"
                        alt="메모지"
                        fill
                        className="object-cover"
                    />

                    <div className="relative z-10 flex h-full flex-col">
                        <h2
                            className="
                                    pt-6
                                    text-center
                                    text-lg
                                    font-bold
                                    text-amber-800
                                "
                        >
                            Memo
                        </h2>

                        <textarea
                            id="memo"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            className="
                                    flex-1
                                    resize-none
                                    bg-transparent
                                    px-6
                                    py-4
                                    text-slate-900
                                    outline-none
                                    memo-scroll
                                    min-h-0
                                    overflow-y-auto  
                                "
                        />
                    </div>
                    </div>
                
            </div>


            <div className="flex gap-3 mt-7 justify-center md:justify-end">
                <button 
                    type="submit"
                    className= {`
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        border-2 border-slate-900
                        px-9 
                        py-3
                        text-slate-900
                        font-bold
                        shadow-[4px_4px_0px_#0F172A]
                        disabled:opacity-50
                        ${isChanged ? "bg-lime-300" : "bg-slate-200"}
                    `}
                >   
                    <img src="/icons/check.png" width={16} height={16} />
                    수정 완료
                </button>

                <button 
                    type="button" 
                    onClick={handleDelete}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        border-2 border-slate-900
                        bg-rose-500
                        px-9 
                        py-3
                        text-white
                        font-bold
                        shadow-[4px_4px_0px_#0F172A]
                        disabled:opacity-50
                    "
                >
                    <img src="/icons/cancel.png" width={16} height={16} />
                    삭제하기
                </button>
            </div>
        </form>
    );
}