import type { Route } from "../../+types/root";
import type {
    StrapiResponse,
    StrapiDestination,
    DestinationMeta,
} from "~/types/types";
import PageHeading from "~/components/PageHeading";
import DestinationTile from "~/components/DestinationTile";

type PhotographyPageProps = {
    loaderData: {
        destinations: DestinationMeta[];
    };
};

export async function loader({
    request,
}: Route.LoaderArgs): Promise<{ destinations: DestinationMeta[] }> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/destinations?sort=location&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
        },
    );
    const json: StrapiResponse<StrapiDestination> = await response.json();
    const destinations = json.data.map((destination) => ({
        documentId: destination.documentId,
        slug: destination.slug,
        location: destination.location,
        thumbnail: {
            documentId: destination.thumbnail.documentId,
            alternativeText: destination.thumbnail.alternativeText,
            url: destination.thumbnail.url,
        },
    }));

    return { destinations };
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Photography | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function PhotographyPage({ loaderData }: PhotographyPageProps) {
    const { destinations } = loaderData;

    return (
        <>
            <PageHeading heading="Photography" />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination) => (
                    <DestinationTile
                        key={destination.documentId}
                        destination={destination}
                    />
                ))}
            </div>
        </>
    );
}
