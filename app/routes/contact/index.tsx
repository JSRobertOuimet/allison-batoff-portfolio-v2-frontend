import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Contact | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function ContactPage() {
    return <h1>Contact</h1>;
}
