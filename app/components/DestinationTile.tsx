import type { DestinationMeta } from "~/types/types";
import { Link } from "react-router";

const DestinationTile = ({ destination }: { destination: DestinationMeta }) => {
    return (
        <Link
            to={`/photography/${destination.slug}`}
            className="relative aspect-square overflow-hidden outline-offset-8"
        >
            <h2 className="absolute bottom-5 left-6 z-10 text-2xl text-white">
                {destination.location}
            </h2>
            <div className="absolute inset-0 bg-linear-to-tr from-black/30 to-white/10"></div>
            <img
                src={destination.thumbnail.imageUrl}
                alt={destination.thumbnail.alternativeText}
                className="h-full w-full object-cover"
            />
        </Link>
    );
};

export default DestinationTile;
