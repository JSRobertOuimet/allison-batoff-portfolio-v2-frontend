import type { Route } from "./+types";
import type {
    Destination,
    StrapiResponse,
    StrapiDestination,
} from "~/types";
import PageHeading from "~/components/PageHeading";

type PhotographyDetailsPageProps = {
    loaderData: {
        destination: Destination;
    };
};

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params as {slug: string};
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/destinations?filters[slug][$eq]=${slug}&populate=*`
    );
    const json: StrapiResponse<StrapiDestination> = await res.json();
    const item = json.data[0];

    const destination: Destination = {
        location: item.location,
        description: item.description,
        slug: item.slug,
        photos: item.photos.map(photo => ({
            documentId: photo.documentId,
            imageUrl: photo.formats.large.url,
            alternativeText: photo.alternativeText,
        })),
    };

    return { destination };
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

const PhotographyDetailsPage = ({
    loaderData,
}: PhotographyDetailsPageProps) => {
    const { destination } = loaderData;
    return (
        <>
            <PageHeading heading={destination.location} />
            <p className="mb-12">{destination.description}</p>
            {destination.photos.map(photo => (
                <img
                    key={photo.documentId}
                    src={photo.imageUrl}
                    alt={photo.alternativeText}
                    className="w-full mb-12"
                />
            ))}
        </>
    );
};

export default PhotographyDetailsPage;
