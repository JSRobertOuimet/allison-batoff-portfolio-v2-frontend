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
        <nav className="flex justify-between not-prose">
            <Link
                key={previousItem.slug}
                to={`/${subdirectory}/${previousItem.slug}`}
                className="w-1/2 p-4 border-r border-r-gray-200 hover:bg-gray-100 outline-offset-8">
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
                className="w-1/2 p-4 flex justify-end hover:bg-gray-100 outline-offset-8">
                <div className="flex flex-col">
                    <div className="text-sm text-right">Next</div>
                    <div className="text-2xl text-right text-balance">
                        {nextItem.location || nextItem.title}
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Pagination;
