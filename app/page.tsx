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
            <h1>My TodoList</h1>

            <TodoInput />

            <section>
              <h2>진행 중</h2>

              <ul>
                {inProgressTodos.map((todo) => (
                  <TodoItem key = {todo.id} todo = {todo} />
                
                ))}
              </ul>

            </section>

            <section>
              <h2>완료</h2>

              <ul>
                {completedTodos.map((todo) => (
                  <TodoItem key = {todo.id} todo = {todo} />
                ))}
              </ul>

            </section>
        </main>
    );
}
