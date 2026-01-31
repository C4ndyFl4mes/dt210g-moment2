import { useEffect, type ReactElement } from "react";
import TodoService from "../services/TodoService";
import type { ITodo } from "../interfaces/ITodo";


export default function TodosDisplay(): ReactElement {
    useEffect(() => {
        const fetchTodos = async () => {
            const todos: Array<ITodo> = await TodoService().get();
            console.log(todos);
        };
       fetchTodos();
    }, []);

    return (
        <div>A</div>
    );
}