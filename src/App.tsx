import type { ReactElement } from 'react';
import './App.css';
import TodosDisplay from './components/TodosDisplay';

export default function App(): ReactElement {
    return (
        <>
        <main className="container mx-auto flex flex-col">
            <h1 className="text-3xl font-bold">Todolist</h1>
            <TodosDisplay />
        </main>
        </>
    );
}
