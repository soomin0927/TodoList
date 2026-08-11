"use client"; // Server Component => 브라우저에서 동작하는 Client Component

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createTodo } from "../../lib/api";

// 항목 추가 입력창 
export default function TodoInput() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Todo 추가 버튼 함수
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { // FormEvent => TypeScript 에서 form 이벤트의 타입을 지정하기 위해 사용
    
    event.preventDefault(); 

    if (!name.trim()) {
      return;
    }

    try {
      setIsLoading(true);

      await createTodo({
        name: name.trim(),
      });

      setName("");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="flex mx-auto w-full max-w-[1200px] gap-4 h-[56px] my-7"
    >
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="
            min-w-0
            flex-1
            rounded-full
            border-2 border-slate-900
            bg-slate-100
            px-4 
            py-3
            shadow-[4px_4px_0px_#0F172A]
            placeholder:text-slate-500
            outline-none
        "
      />

      <button 
          type="submit"     
          disabled={isLoading}
          className="
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              border-2 border-slate-900
              bg-slate-200
              px-5 
              py-3
              text-slate-900
              shadow-[4px_4px_0px_#0F172A]
              disabled:opacity-50"
      >
        + {isLoading ? "추가 중..." : "추가하기"}
      </button>

    </form>
  );
}