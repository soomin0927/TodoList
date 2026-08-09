export interface Todo {
    id: number;
    tenantId: string;
    name: string;
    memo: string;
    imageUrl: string | null;
    isCompleted: boolean;
}

export interface TodoListItem {
    id: number;
    name: string;
    isCompleted: boolean;
}

export interface CreateTodoRequest {
    name: string;
}

export interface UpdateTodoRequest {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
}

export interface ImageUploadResponse {
    url: string;
}