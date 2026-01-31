import type { ReactElement } from 'react';
import './App.css';
import TodosDisplay from './components/TodosDisplay';

export default function App(): ReactElement {
    return (
        <>
        <main>
            <TodosDisplay />
        </main>
        </>
    );
}
