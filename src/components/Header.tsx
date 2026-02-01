import type { ReactElement } from "react";

// Header-komponent som visar applikationens titel.
export default function Header(): ReactElement {
    return (
        <header className="py-4 text-center shadow-xl mb-5">
            <p className="text-xl font-bold">Moment 2 - React Interactive</p>
        </header>
    );
}