import axios, { type AxiosResponse } from "axios";
import type { ITodo } from "../interfaces/ITodo";

// Service för att hantera API-anrop relaterade till todo-poster.
export default function TodoService() {
    const client = axios.create({
        baseURL: 'https://dt210g-net-api-todos-production.up.railway.app/api/todos'
    });
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Hämta alla todo-poster från API:et.
    async function get(): Promise<Array<ITodo>> {
        try {
            const res: AxiosResponse<Array<ITodo>, any, {}> = await client.get<Array<ITodo>>("/", config);

            if (res.data && res.data.length > 0) {
                return res.data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // Skapa en ny todo-post via API:et.
    async function post(todo: ITodo): Promise<ITodo | null> {
        try {
            const res = await client.post<ITodo>("/", todo, config);

            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Uppdatera en befintlig todo-post via API:et.
    async function put(todo: ITodo): Promise<ITodo | null> {
        try {
            if (!todo.id) {
                throw new Error("An ID is needed for updating a todo.");
            }
            const res = await client.put(`/${todo.id}`, todo, config);

            if (res.status === 204) {
                return todo;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // Radera en befintlig todo-post via API:et.
    async function del(todo: ITodo): Promise<ITodo | null> {
         try {
            if (!todo.id) {
                throw new Error("An ID is needed for deleting a todo.");
            }
            const res = await client.delete(`/${todo.id}`, config);

            if (res.status === 204) {
                return todo;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return { get, post, put, del };
}