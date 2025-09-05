import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Photography | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function Photography() {
    return <h1>Photography</h1>;
}
