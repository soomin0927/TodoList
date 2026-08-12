import type { CreateTodoRequest, ImageUploadResponse, Todo, TodoListItem, UpdateTodoRequest } from "../types/todo";


// GET - 항목 목록 조회
export async function getTodos(): Promise<TodoListItem[]> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Todo 목록을 불러오는데 실패했습니다.");
    }

    return response.json();

}


// POST - 새로운 항목 추가
export async function createTodo(
    data: CreateTodoRequest
): Promise<TodoListItem> {

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


// GET - 항목 상세페이지 조회
export async function getTodo(itemId: number): Promise<Todo> {



    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`,
    );

    if (!response.ok) {
        throw new Error("Todo 항목을 불러오는 데 실패했습니다.");
    }

    return response.json();

}


// PATCH - 항목 수정
export async function updateTodo(
    itemId: number,
    data: UpdateTodoRequest
): Promise<TodoListItem> {

   const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Todo 항목을 수정하는 데 실패했습니다.");
    }

    return response.json();
}


// DELETE - 항목 삭제
export async function deleteTodo(itemId: number): Promise<void> {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Todo 항목을 수정하는 데 실패했습니다.");
    }
    
}


// POST - 이미지 파일 업로드
export async function uploadImage(
    file: File
): Promise<ImageUploadResponse> {

    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_TENANT_ID}/images/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
    }

    return response.json();



     
}

