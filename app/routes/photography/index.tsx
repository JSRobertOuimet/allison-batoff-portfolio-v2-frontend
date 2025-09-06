import type { Route } from "../../+types/root";
import type {
    StrapiResponse,
    StrapiDestination,
    Destination,
} from "~/types";
import DestinationTile from "~/components/DestinationTile";

type PhotographyPageProps = {
    loaderData: {
        destinations: Destination[];
    };
};

export async function loader({
    request,
}: Route.LoaderArgs): Promise<{ destinations: Destination[] }> {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/destinations?populate=*`
    );
    const json: StrapiResponse<StrapiDestination> = await res.json();
    const destinations = json.data.map(destination => ({
        location: destination.location,
        description: destination.description,
        slug: destination.slug,
        thumbnail: {
            imageUrl: destination.thumbnail.formats.large.url,
            alternativeText: destination.thumbnail.alternativeText,
        },
        photos: destination.photos.map(photo => ({
            imageUrl: photo.formats.large.url,
            alternativeText: photo.alternativeText,
        })),
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
            <h1>Photography</h1>

            {destinations.map(destination => (
                <DestinationTile
                    key={destination.slug}
                    destination={destination}
                />
            ))}
        </>
    );
}
