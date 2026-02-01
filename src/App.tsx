import type { ReactElement } from 'react';
import './App.css';
import TodosDisplay from './components/TodosDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

// Huvudkomponent för applikationen.
export default function App(): ReactElement {
    return (
        <>
        <Header />
        <main className="container mx-auto flex flex-col flex-1 max-w-300 w-[96vw]">
            <h1 className="text-3xl font-bold">Todolist</h1>
            <TodosDisplay />
        </main>
        <Footer />
        </>
    );
}
