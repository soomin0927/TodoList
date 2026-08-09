import { getTodos } from "../lib/api";

export default async function ItmePAge() {
    const todos = await getTodos();

    return (
        <main>
            <h1>My TodoList</h1>

            <ul>
                {todos.map((todo) => (
                <li key = {todo.id}>
                    {todo.name}
                </li>
                ))}
            </ul>
        </main>
    );
}
