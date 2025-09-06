import type { Route } from "../../+types/root";
import PageHeading from "~/components/PageHeading";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Design | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function DesignPage() {
    return (
        <>
            <PageHeading heading="Design" />
        </>
    );
}
