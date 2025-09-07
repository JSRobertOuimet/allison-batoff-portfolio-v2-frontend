import type { DestinationMeta } from "~/types";
import { Link } from "react-router";

const DestinationTile = ({
    destination,
}: {
    destination: DestinationMeta;
}) => {
    return (
        <Link
            to={destination.slug}
            className="relative aspect-square overflow-hidden">
            <h2 className="absolute left-6 bottom-5 text-2xl text-white z-10">
                {destination.location}
            </h2>
            <div className="absolute inset-0 bg-linear-to-tr from-black/30 to-white/10"></div>
            <img
                src={destination.thumbnail.imageUrl}
                alt={destination.thumbnail.alternativeText}
                className="w-full h-full object-cover"
            />
        </Link>
    );
};

export default DestinationTile;
