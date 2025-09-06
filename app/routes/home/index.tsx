import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function HomePage() {
    return <h1>Home</h1>;
}
