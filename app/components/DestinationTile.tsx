import type { Destination } from "~/types";
import { Link } from "react-router";

const DestinationTile = ({
    destination,
}: {
    destination: Destination;
}) => {
    return (
        <Link to={destination.slug}>
            <h2>{destination.location}</h2>
            <img
                src={destination.thumbnail.imageUrl}
                alt={destination.thumbnail.alternativeText}
            />
        </Link>
    );
};

export default DestinationTile;
