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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "추가 중..." : "추가하기"}
      </button>
    </form>
  );
}