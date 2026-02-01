import { useState, type ReactElement } from "react";
import type { ITodo } from "../interfaces/ITodo";
import type { IError } from "../interfaces/IError";
import { ValidationForm } from "../validation/ValidationForm";


export default function CreateTodo({ setNewTodo, setOverlay }: { setNewTodo: React.Dispatch<React.SetStateAction<ITodo | null>>, setOverlay: React.Dispatch<React.SetStateAction<boolean>> }): ReactElement {
    const [localTodo, setLocalTodo] = useState<ITodo>({
        title: "",
        description: "",
        status: 0
    });
    const [error, setError] = useState<IError>({});

    const transparentBackgroundColor = {
        backgroundColor: "rgba(0, 0, 0, 0.97)"
    };

    const validation = async () => {
        const errors = await ValidationForm.validate(localTodo);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            setNewTodo(localTodo);
        } 
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-10" style={transparentBackgroundColor}>
            <form className="flex flex-col gap-y-5 w-150 p-5 mt-10 rounded-2xl max-w-[95vw] mx-auto bg-white">
                <label className="flex flex-col">
                    <span>Title</span>
                    <input type="text" name="title" value={localTodo.title} onChange={(e) => setLocalTodo({ ...localTodo, title: e.target.value })} placeholder="Enter title..." className="shadow rounded-md p-2 border border-gray-200" />
                    {error.title && <span className="border bg-red-300 p-2 rounded-md mt-3">{error.title}</span>}
                </label>
                <label className="flex flex-col">
                    <span>Description</span>
                    <textarea name="description" value={localTodo.description} onChange={(e) => setLocalTodo({ ...localTodo, description: e.target.value })} placeholder="Enter description..." className="shadow rounded-md p-2 border-t-2 border-gray-200"></textarea>
                    {error.description && <span className="border bg-red-300 p-2 rounded-md mt-3">{error.description}</span>}
                </label>
                <div className="flex flex-wrap gap-4">
                    <button type="button" className="px-3 py-1 bg-sky-400 hover:brightness-95 active:brightness-90 rounded-md cursor-pointer shadow" onClick={validation}>Update</button>
                    <button type="button" className="px-3 py-1 bg-orange-300 hover:brightness-95 active:brightness-90 rounded-md cursor-pointer shadow" onClick={() => setOverlay(false)}>Close</button>
                </div>
            </form>
        </div>
    );
}