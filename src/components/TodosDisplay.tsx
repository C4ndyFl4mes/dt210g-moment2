import { useEffect, useState, type ReactElement } from "react";
import TodoService from "../services/TodoService";
import type { ITodo } from "../interfaces/ITodo";
import Todo from "./Todo";


export default function TodosDisplay(): ReactElement {
    const [todos, setTodos] = useState<Array<ITodo> | null>(null);
    const [outputTodo, setOutputTodo] = useState<ITodo | null>(null);


    useEffect(() => {
        const fetchTodos = async () => {
            setTodos(await TodoService().get());
        };
        fetchTodos();
    }, []);
    useEffect(() => {
        console.log(outputTodo);
    }, [outputTodo])



    if (!todos) {
        return (
            <section>
                <h2>Loading...</h2>
            </section>
        )
    } else {
        return (
            <section>
                {
                    todos?.map((todo) => (
                        <Todo todo={todo} setOutput={setOutputTodo} key={todo.id} />
                    ))
                }
            </section>
        );
    }
}