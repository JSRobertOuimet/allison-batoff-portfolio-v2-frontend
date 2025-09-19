import type { Route } from "./+types";
import type {
    Destination,
    StrapiResponse,
    StrapiDestination,
} from "~/types";
import PageHeading from "~/components/PageHeading";
import Pagination from "~/components/Pagination";

type LoaderData = {
    destination: Destination;
    previousDestination: Destination;
    nextDestination: Destination;
};

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params as { slug: string };

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/destinations?sort=location&populate=*`
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
    const currentIndex = destinations.findIndex(
        destination => destination.slug === slug
    );
    const destination = destinations[currentIndex];
    const previousDestination =
        destinations[currentIndex - 1] ||
        destinations[destinations.length - 1];
    const nextDestination =
        destinations[currentIndex + 1] || destinations[0];

    return { destination, previousDestination, nextDestination };
}

export function meta({ data }: { data: LoaderData }) {
    return [
        { title: `${data.destination.location} | Allison Batoff` },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

const PhotographyDetailsPage = ({
    loaderData,
}: {
    loaderData: LoaderData;
}) => {
    const { destination, previousDestination, nextDestination } =
        loaderData;
    return (
        <>
            <PageHeading heading={destination.location} />
            <div className="grid lg:grid-cols-12 gap-8">
                <p className="lg:col-span-4">
                    {destination.description}
                </p>
                <div className="lg:col-span-8">
                    {destination.photos.map(photo => (
                        <img
                            key={photo.documentId}
                            src={photo.imageUrl}
                            alt={photo.alternativeText}
                            className="w-full mb-12"
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
