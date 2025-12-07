import type { Route } from "./+types";
import type {
    StrapiResponse,
    StrapiDestination,
    Destination,
} from "~/types/types";
import PageHeading from "~/components/PageHeading";
import Pagination from "~/components/Pagination";

type PhotographyDetailsPageProps = {
    loaderData: {
        destination: Destination;
        previousDestination: Destination;
        nextDestination: Destination;
    };
};

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
    destination: Destination;
    previousDestination: Destination;
    nextDestination: Destination;
}> {
    const { slug } = params as { slug: string };

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
        location: destination.location,
        description: destination.description,
        slug: destination.slug,
        thumbnail: {
            documentId: destination.thumbnail.documentId,
            alternativeText: destination.thumbnail.alternativeText,
            url: destination.thumbnail.url,
        },
        photos: destination.photos.map((photo) => ({
            documentId: photo.documentId,
            alternativeText: photo.alternativeText,
            url: photo.url,
        })),
    }));
    const currentIndex = destinations.findIndex(
        (destination) => destination.slug === slug,
    );
    const destination = destinations[currentIndex];
    const previousDestination =
        destinations[currentIndex - 1] || destinations[destinations.length - 1];
    const nextDestination = destinations[currentIndex + 1] || destinations[0];

    return { destination, previousDestination, nextDestination };
}

export function meta({ loaderData }: PhotographyDetailsPageProps) {
    return [
        { title: `${loaderData.destination.location} | Allison Batoff` },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

const PhotographyDetailsPage = ({
    loaderData,
}: PhotographyDetailsPageProps) => {
    const { destination, previousDestination, nextDestination } = loaderData;

    return (
        <>
            <PageHeading heading={destination.location} />
            <div className="grid gap-8 lg:grid-cols-12">
                <p className="lg:col-span-4">{destination.description}</p>
                <div className="lg:col-span-8">
                    {destination.photos.map((photo) => (
                        <img
                            key={photo.documentId}
                            src={photo.url}
                            alt={photo.alternativeText}
                            className="mb-12 w-full"
                        />
                    ))}
                    <Pagination
                        subdirectory="photography"
                        previousItem={previousDestination}
                        nextItem={nextDestination}
                    />
                </div>
            </div>
        </>
    );
};

export default PhotographyDetailsPage;
