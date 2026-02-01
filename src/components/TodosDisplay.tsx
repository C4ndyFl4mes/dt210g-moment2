import { useEffect, useState, type ReactElement } from "react";
import TodoService from "../services/TodoService";
import type { ITodo } from "../interfaces/ITodo";
import Todo from "./Todo";
import addSVG from "../assets/add-plus-circle-svgrepo-com.svg";
import CreateTodo from "./CreateTodo";

// Komponent för att visa och hantera listan av todos.
export default function TodosDisplay(): ReactElement {
    const [todos, setTodos] = useState<Array<ITodo> | null>(null);
    const [outputTodo, setOutputTodo] = useState<ITodo | null>(null);
    const [deleteTodo, setDeleteTodo] = useState<ITodo | null>(null);
    const [newTodo, setNewTodo] = useState<ITodo | null>(null)
    const [overlay, setOverlay] = useState<boolean>(false);


    useEffect(() => {
        const getTodos = async () => {
            setTodos(await TodoService().get());
        };
        getTodos();
    }, []);
    useEffect(() => {
        if (outputTodo) {
            const putTodo = async () => {
                const todo: ITodo | null = await TodoService().put(outputTodo);
                if (todo) {
                    setTodos(prev => prev?.map(todo => todo.id === outputTodo.id ? outputTodo : todo) || null);
                    setOutputTodo(null);
                }
            }
            putTodo();
        }
    }, [outputTodo])
    useEffect(() => {
        if (deleteTodo) {
            const delTodo = async () => {
                const todo: ITodo | null = await TodoService().del(deleteTodo);
                if (todo) {
                    setTodos(prev => prev?.filter(todo => todo.id !== deleteTodo.id) || null);
                    setDeleteTodo(null);
                }
            }
            delTodo();
        }
    }, [deleteTodo]);
    useEffect(() => {
        if(newTodo) {
            const postTodo = async () => {
                const todo: ITodo | null = await TodoService().post(newTodo);
                if (todo) {
                    setTodos(prev => prev ? [...prev, todo] : [todo]);
                    setNewTodo(null);
                }
            }
            postTodo();
        }
    }, [newTodo]);

    if (!todos) {
        return (
            <>
                {
                    overlay && <CreateTodo setNewTodo={setNewTodo} setOverlay={setOverlay}/>
                }
                <button title="Add" className="ml-auto cursor-pointer" onClick={() => setOverlay(true)}><img src={addSVG} alt="Add todo" width="50" height="auto" /></button>
                <hr />
                <section>
                    <h2>Loading...</h2>
                </section>
            </>
        )
    } else {
        return (
            <>
                {
                    overlay && <CreateTodo setNewTodo={setNewTodo} setOverlay={setOverlay} />
                }
                <button title="Add" className="ml-auto cursor-pointer" onClick={() => setOverlay(true)}><img src={addSVG} alt="Add todo" width="50" height="auto" /></button>
                <hr />
                <section className="flex flex-wrap gap-5 pt-2">
                    {
                        todos?.map((todo) => (
                            <Todo todo={todo} setOutput={setOutputTodo} setDeleteTodo={setDeleteTodo} key={todo.id} />
                        ))
                    }
                </section>
            </>

        );
    }
}