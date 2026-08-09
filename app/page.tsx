import { getTodos } from "../lib/api";

export default async function ItmePAge() {

    const todos = await getTodos();

    const inProgressTodos = todos.filter((todo) => !todo.isCompleted);
    const completedTodos = todos.filter((todo) => todo.isCompleted);

    return (
        <main>
            <h1>My TodoList</h1>

            <section>
              <h2>진행 중</h2>

              <ul>
                {inProgressTodos.map((todo) => (
                  <li key = {todo.id}>
                    {todo.name}
                  </li>
                ))}
              </ul>

            </section>

            <section>
              <h2>완료</h2>

              <ul>
                {completedTodos.map((todo) => (
                  <li key = {todo.id}>
                    {todo.name}
                  </li>
                ))}
              </ul>

            </section>
        </main>
    );
}
