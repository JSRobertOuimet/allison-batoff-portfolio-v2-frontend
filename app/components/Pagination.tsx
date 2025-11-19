import { Link } from "react-router";

const Pagination = ({
    subdirectory,
    previousItem,
    nextItem,
}: {
    subdirectory: string;
    previousItem: any;
    nextItem: any;
}) => {
    return (
        <nav className="not-prose flex justify-between">
            <Link
                key={previousItem.slug}
                to={`/${subdirectory}/${previousItem.slug}`}
                className="w-1/2 border-r border-r-gray-200 p-4 outline-offset-8 hover:bg-gray-100"
            >
                <div className="flex flex-col">
                    <div className="text-sm">Previous</div>
                    <div className="text-2xl">
                        {previousItem.location || previousItem.title}
                    </div>
                </div>
            </Link>
            <Link
                key={nextItem.slug}
                to={`/${subdirectory}/${nextItem.slug}`}
                className="flex w-1/2 justify-end p-4 outline-offset-8 hover:bg-gray-100"
            >
                <div className="flex flex-col">
                    <div className="text-right text-sm">Next</div>
                    <div className="text-right text-2xl text-balance">
                        {nextItem.location || nextItem.title}
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Pagination;
