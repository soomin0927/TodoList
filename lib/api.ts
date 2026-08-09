import type { CreateTodoRequest, TodoListItem } from "../types/todo";


// GET - 항목 목록 조회
export async function getTodos() : Promise<TodoListItem[]> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items`
    );

    if (!response.ok) {
        throw new Error("Todo 목록을 불러오는데 실패했습니다.");
    }

    return response.json();

}


// POST - 새로운 항목 추가
export async function createTodo(
    data: CreateTodoRequest
) : Promise<TodoListItem> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items`,
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Todo 항목을 추가하는 데 실패했습니다.");
    }

    return response.json();

}

export async function getTodo() {
    // GET - 항목 상세페이지 조회
}

export async function updateTodo() {
    // PATCH - 항묵 수정 
}

export async function deleteTodo() {
    // DELETE - 항목 삭제
}

export async function uploadImage() {
    // POST - 이미지 파일 업로드 
}

