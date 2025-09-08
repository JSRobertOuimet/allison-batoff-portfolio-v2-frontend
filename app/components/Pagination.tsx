import { Link } from "react-router";
import type { Destination } from "~/types";

const Pagination = ({
    previousDestination,
    nextDestination,
}: {
    previousDestination: Destination;
    nextDestination: Destination;
}) => {
    return (
        <nav className="flex justify-between">
            <Link
                key={previousDestination.slug}
                to={`/photography/${previousDestination.slug}`}
                className="w-1/2 p-4 flex hover:bg-gray-100">
                <div className="flex flex-col">
                    <div className="text-sm">Previous</div>
                    <div className="text-2xl">
                        {previousDestination.location}
                    </div>
                </div>
            </Link>
            <Link
                key={nextDestination.slug}
                to={`/photography/${nextDestination.slug}`}
                className="w-1/2 p-4 flex justify-end hover:bg-gray-100">
                <div className="flex flex-col">
                    <div className="text-sm">Next</div>
                    <div className="text-2xl">
                        {nextDestination.location}
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Pagination;
