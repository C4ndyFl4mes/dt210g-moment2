import type { ReactElement } from "react";

// Footer-komponent som visar sidfoten med upphovsinformation.
export default function Footer(): ReactElement {
    return (
        <footer className="py-4 text-center border-t border-gray-300">
            <p>Isaac - 2026</p>
        </footer>
    );
}