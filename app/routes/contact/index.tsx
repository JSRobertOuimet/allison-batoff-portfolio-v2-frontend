import type { Route } from "../../+types/root";
import PageHeading from "~/components/PageHeading";

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
    return (
        <>
            <PageHeading heading="Contact" />
        </>
    );
}
