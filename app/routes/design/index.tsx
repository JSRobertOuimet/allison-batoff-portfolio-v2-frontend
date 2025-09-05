import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Design | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function Design() {
    return <h1>Design</h1>;
}
