import Image from "next/image";

import Header from "../components/common/Header";
import TodoInput from "../components/todo/TodoInput";
import TodoItem from "../components/todo/TodoItem";
import { getTodos } from "../lib/api";

export default async function ItmePage() {

    const todos = await getTodos();

    // console.log("전체 Todo: ", todos);

    const inProgressTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    return (
        <main>

            <Header />

            <div className="mx-auto w-full max-w-[1200px] px-5 py-7">

              <TodoInput /> {/* 항목 추가 입력창 */}

              <div className="flex gap-5 w-full">
                  <section className="mt-3 flex-1">
                    {/* <h2>진행 중</h2> */}
                    <Image
                      src="/images/todo_img.png"
                      alt="진행 중인 항목 영역"
                      width={101}
                      height={36}
                    />

                    <ul>
                      {inProgressTodos.map((todo) => (
                        <TodoItem key = {todo.id} todo = {todo} />
                        
                      ))}
                    </ul>

                  </section>

                  <section className="mt-3 flex-1">
                    {/* <h2>완료</h2> */}
                    <Image
                      src="/images/done_img.png"
                      alt="완료한 항목 영역"
                      width={101}
                      height={36}
                    />

                    <ul>
                      {completedTodos.map((todo) => (
                        <TodoItem key = {todo.id} todo = {todo} />
                      ))}
                    </ul>

                  </section>
                </div>
            </div>
        </main>
    );
}
