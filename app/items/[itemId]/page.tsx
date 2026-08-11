
import Header from "../../../components/common/Header";
import TodoEditForm from "../../../components/detail/TodoEditForm";
import { getTodo } from "../../../lib/api";

interface TodoDetailPageProps {
    params: Promise<{
        itemId: string;
    }>;
}

export default async function ItmePage({
    params,
} : TodoDetailPageProps) {

    const { itemId } = await params;
    // console.log("itemId : ", itemId);
    
    const todo = await getTodo(Number(itemId));


    return (
        <main>

            <Header />

            <div className="mx-auto w-full max-w-[1200px] px-5 py-7 mb-50">

                <TodoEditForm todo = {todo} />

            </div>
        </main>
    )
}