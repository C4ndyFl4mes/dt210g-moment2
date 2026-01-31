import type { EStatus } from "../enums/EStatus";


export interface ITodo {
    id?: number;
    title: string;
    description: string;
    status: typeof EStatus[keyof typeof EStatus]
}