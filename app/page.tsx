import Image from "next/image";

import TodoInput from "../components/todo/TodoInput";
import TodoItem from "../components/todo/TodoItem";
import { getTodos } from "../lib/api";


// "/" 페이지
export default async function ItemPage() {

    const todos = await getTodos();

    // console.log("전체 Todo: ", todos);

    const inProgressTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    return (
        <main>

            <div className="mx-auto w-full max-w-[1200px] px-5 py-7">

              <TodoInput /> {/* 항목 추가 입력창 */}

              <div className="flex flex-col gap-5 w-full my-10 lg:flex-row">
                  <section className="mt-3 min-w-0 flex-1">
                    {/* <h2>진행 중</h2> */}
                    <Image
                      src="/images/todo_img.png"
                      alt="진행 중인 항목 영역"
                      width={101}
                      height={36}
                    />

                  {inProgressTodos.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                        <Image
                          src= "/images/todo_empty.png"
                          alt= "진행 중인 항목 없음"
                          width={240}
                          height={240}
                        />

                        <p className="mt-4 text-slate-400">
                          할 일이 없어요.
                          <br />
                          TODO를 새롭게 추가해주세요!
                        </p>

                    </div>
                  ) :  (
                      <ul>
                        {inProgressTodos.map((todo) => (
                          <TodoItem key = {todo.id} todo = {todo} />
                        ))}
                      </ul>

                  )}

                  </section>

                  <section className="mt-3 min-w-0 flex-1">
                    {/* <h2>완료</h2> */}
                    <Image
                      src="/images/done_img.png"
                      alt="완료한 항목 영역"
                      width={101}
                      height={36}
                    />

                    {completedTodos.length === 0 ? (
                      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                          <Image
                              src="/images/done_empty.png"
                              alt="완료한 일이 없음"
                              width={240}
                              height={240}
                          />

                          <p className="mt-4 text-slate-400">
                              아직 다 한 일이 없어요.
                              <br />
                              해야 할 일을 체크해보세요!
                          </p>
                      </div>
                  ) : (
                      <ul>
                        {completedTodos.map((todo) => (
                          <TodoItem key = {todo.id} todo = {todo} />
                        ))}
                      </ul>
                  )}
                  </section>
                </div>
            </div>
        </main>
    );
}
