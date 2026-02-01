import type { EStatus } from "../enums/EStatus";

// Definition av ITodo-gränssnittet för en todo-post.
export interface ITodo {
    id?: number;
    title: string;
    description: string;
    status: typeof EStatus[keyof typeof EStatus]
}