import { useRef, useState, type ReactElement } from "react";
import type { ITodo } from "../interfaces/ITodo";
import closeSVG from "../assets/close-sm-svgrepo-com.svg";
import editSVG from "../assets/edit-svgrepo-com.svg";
import type { EStatus } from "../enums/EStatus";
import type { IError } from "../interfaces/IError";
import { ValidationForm } from "../validation/ValidationForm";

// Todo-komponent som hanterar visning och redigering av en enskild todo.
export default function Todo({ todo, setOutput, setDeleteTodo }: { todo: ITodo, setOutput: React.Dispatch<React.SetStateAction<ITodo | null>>, setDeleteTodo: React.Dispatch<React.SetStateAction<ITodo | null>> }): ReactElement {
    const statusText: Array<string> = ['Pending', 'Ongoing', 'Completed'];
    const [localTodo, setLocalTodo] = useState<ITodo>(todo);
    const [error, setError] = useState<IError>({});
    const [editmode, setEditMode] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Referens för debounce-timer.

    const nextStatus = () => {
        const newStatus = (localTodo.status + 1) % 3 as typeof EStatus[keyof typeof EStatus];
        setLocalTodo({ ...localTodo, status: newStatus });

        // Debounce för att undvika snabb statusändring till API:et.
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setOutput({ ...localTodo, status: newStatus });
        }, 500);
    }

    const validation = async () => {
        const errors = await ValidationForm.validate(localTodo);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            setOutput(localTodo);
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    }

    if (editmode) {
        return (
            <article className="shadow w-75 aspect-video relative p-5 rounded-2xl">
                <h2 className="font-bold text-xl">Updating</h2>
                <div className="absolute top-0 right-0 flex">
                    <button className="cursor-pointer" title="Edit" onClick={() => setEditMode(!editmode)}>
                        <img src={editSVG} alt="edit" width="25" height="auto" />
                    </button>
                    <button className="cursor-pointer" title="Delete" onClick={() => setDeleteTodo(localTodo)}>
                        <img src={closeSVG} alt="close" width="25" height="auto" />
                    </button>
                </div>
                <form className="flex flex-col gap-y-5">
                    <label className="flex flex-col">
                        <span>Title</span>
                        <input type="text" name="title" value={localTodo.title} onChange={(e) => setLocalTodo({ ...localTodo, title: e.target.value })} placeholder="Enter title..." className="shadow rounded-md p-2 border border-gray-200" />
                        {error.title && <span className="border bg-red-300 p-2 rounded-md mt-3">{error.title}</span>}
                    </label>
                    <label className="flex flex-col">
                        <span>Description</span>
                        <textarea name="description" value={localTodo.description} onChange={(e) => setLocalTodo({ ...localTodo, description: e.target.value })} placeholder="Enter description..." className="shadow rounded-md p-2 border-gray-200"></textarea>
                        {error.description && <span className="border bg-red-300 p-2 rounded-md mt-3">{error.description}</span>}
                    </label>
                    <div>
                        <button type="button" className="px-3 py-1 bg-sky-400 hover:brightness-95 active:brightness-90 rounded-md cursor-pointer shadow" onClick={validation}>Update</button>
                    </div>
                </form>
                <small className="absolute bottom-2 right-2 text-red-400 cursor-not-allowed">{statusText[localTodo.status]}</small>
            </article>
        );
    } else {
        return (
            <article className="shadow w-75 aspect-video relative p-5 rounded-2xl border border-gray-300">
                <div className="absolute top-0 right-0 flex">
                    <button className="cursor-pointer" title="Edit" onClick={() => setEditMode(!editmode)}>
                        <img src={editSVG} alt="edit" width="25" height="auto" />
                    </button>
                    <button className="cursor-pointer" title="Delete" onClick={() => setDeleteTodo(localTodo)}>
                        <img src={closeSVG} alt="close" width="25" height="auto" />
                    </button>
                </div>
                <h2 className="font-bold text-xl wrap-break-word">{todo.title}</h2>
                <p className="wrap-break-word">{todo.description}</p>
                <small className="absolute bottom-2 right-2">
                    <button className="cursor-pointer" onClick={nextStatus}>{statusText[localTodo.status]}</button>
                </small>
            </article>
        );
    }
}