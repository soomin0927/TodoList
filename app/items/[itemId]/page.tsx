import TodoEditForm from "../../../components/detail/TodoEditForm";
import { getTodo } from "../../../lib/api";

interface TodoDetailPageProps {
    params: Promise<{
        itemId: string;
    }>;
}

export default async function ItmePAge({
    params,
} : TodoDetailPageProps) {

    const { itemId } = await params;
    // console.log("itemId : ", itemId);
    
    const todo = await getTodo(Number(itemId));

    return (
        <main>
            <h1> {todo.name} </h1>

            <TodoEditForm todo = {todo} />

            {/* <p>
                상태 : {todo.isCompleted ? "완료" : "진행 중"}
            </p>

            <section>
                <h2>메모</h2>
                <p>
                    {todo.memo || "메모가 없습니다."}
                </p>
            </section>

             */}

            {todo.imageUrl && (
                <section>
                    <h2>이미지</h2>
                    <img src={todo.imageUrl} alt={todo.name} width={500}/>
                </section>
            )}

        </main>
    )
}