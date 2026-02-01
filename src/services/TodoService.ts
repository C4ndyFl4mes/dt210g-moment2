import axios, { type AxiosResponse } from "axios";
import type { ITodo } from "../interfaces/ITodo";
import type { IError } from "../interfaces/IError";

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
    async function get(): Promise<Array<ITodo> | IError> {
        try {
            const res: AxiosResponse<Array<ITodo>, any, {}> = await client.get<Array<ITodo>>("/", config);

            if (res.data && res.data.length > 0) {
                return res.data;
            } else {
                return {
                    server_empty: "No listed todos found."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                server_empty: "Unable to fetch todos."
            };
        }
    }

    // Skapa en ny todo-post via API:et.
    async function post(todo: ITodo): Promise<ITodo | IError> {
        try {
            const res = await client.post<ITodo>("/", todo, config);

            if (res.data) {
                return res.data;
            } else {
                return {
                    server_create: "No todo was added to the list."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                server_create: "Unable to add to the list."
            };
        }
    }

    // Uppdatera en befintlig todo-post via API:et.
    async function put(todo: ITodo): Promise<ITodo | IError> {
        try {
            if (!todo.id) {
                throw new Error("An ID is needed for updating a todo.");
            }
            const res = await client.put(`/${todo.id}`, todo, config);

            if (res.status === 204) {
                return todo;
            } else {
                return {
                    server_update: "The todo was not updated."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                server_update: "Unable to update todo."
            };
        }
    }

    // Radera en befintlig todo-post via API:et.
    async function del(todo: ITodo): Promise<ITodo | IError> {
         try {
            if (!todo.id) {
                throw new Error("An ID is needed for deleting a todo.");
            }
            const res = await client.delete(`/${todo.id}`, config);

            if (res.status === 204) {
                return todo;
            } else {
                return {
                    server_delete: "The todo was not deleted."
                };
            }
        } catch (error) {
            console.log(error);
            return {
                server_delete: "Unable to delete todo."
            };
        }
    }

    return { get, post, put, del };
}