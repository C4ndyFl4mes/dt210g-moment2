import { useRef, useState, type ReactElement } from "react";
import type { ITodo } from "../interfaces/ITodo";
import closeSVG from "../assets/close-sm-svgrepo-com.svg";
import editSVG from "../assets/edit-svgrepo-com.svg";
import type { EStatus } from "../enums/EStatus";


export default function Todo({ todo, setOutput, setDeleteTodo }: { todo: ITodo, setOutput: React.Dispatch<React.SetStateAction<ITodo | null>>, setDeleteTodo: React.Dispatch<React.SetStateAction<ITodo | null>> }): ReactElement {
    const statusText: Array<string> = ['Pending', 'Ongoing', 'Completed'];
    const [localTodo, setLocalTodo] = useState<ITodo>(todo);
    const [editmode, setEditMode] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const nextStatus = () => {
        const newStatus = (localTodo.status + 1) % 3 as typeof EStatus[keyof typeof EStatus];
        setLocalTodo({...localTodo, status: newStatus});

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setOutput({...localTodo, status: newStatus});
        }, 1000);
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
                        <input type="text" name="title" value={localTodo.title} onChange={(e) => setLocalTodo({...localTodo, title: e.target.value})} placeholder="Enter title..." className="shadow rounded-md p-2 border border-gray-200" />
                    </label>
                    <label className="flex flex-col">
                        <span>Description</span>
                        <textarea name="description" value={localTodo.description} onChange={(e) => setLocalTodo({...localTodo, description: e.target.value})} placeholder="Enter description..." className="shadow rounded-md p-2 border-gray-200"></textarea>
                    </label>
                    <div>
                        <button type="button" className="px-3 py-1 bg-sky-400 hover:brightness-95 active:brightness-90 rounded-md cursor-pointer shadow" onClick={() => setOutput(localTodo)}>Update</button>
                    </div>
                </form>
                <small className="absolute bottom-2 right-2 text-red-400 cursor-not-allowed">{statusText[localTodo.status]}</small>
            </article>
        )
    } else {
        return (
            <article className="shadow w-75 aspect-video relative p-5 rounded-2xl">
                <div className="absolute top-0 right-0 flex">
                    <button className="cursor-pointer" title="Edit" onClick={() => setEditMode(!editmode)}>
                        <img src={editSVG} alt="edit" width="25" height="auto" />
                    </button>
                    <button className="cursor-pointer" title="Delete" onClick={() => setDeleteTodo(localTodo)}>
                        <img src={closeSVG} alt="close" width="25" height="auto" />
                    </button>
                </div>
                <h2 className="font-bold text-xl">{todo.title}</h2>
                <p>{todo.description}</p>
                <small className="absolute bottom-2 right-2">
                    <button className="cursor-pointer" onClick={nextStatus}>{statusText[localTodo.status]}</button>
                </small>
            </article>
        );
    }
}