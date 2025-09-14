import type { Route } from "../../+types/root";
import type {
    StrapiResponse,
    StrapiDestination,
    DestinationMeta,
} from "~/types";
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
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/destinations?sort=title&populate=*`
    );
    const json: StrapiResponse<StrapiDestination> = await res.json();
    const destinations = json.data.map(destination => ({
        title: destination.title,
        slug: destination.slug,
        thumbnail: {
            imageUrl: destination.thumbnail.formats.large.url,
            alternativeText: destination.thumbnail.alternativeText,
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

export default function PhotographyPage({
    loaderData,
}: PhotographyPageProps) {
    const { destinations } = loaderData;

    return (
        <>
            <PageHeading heading="Photography" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {destinations.map(destination => (
                    <DestinationTile
                        key={destination.slug}
                        destination={destination}
                    />
                ))}
            </div>
        </>
    );
}
