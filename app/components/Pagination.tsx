import type { Destination } from "~/types";
import { Link } from "react-router";

const toSentenceCase = (string: string): string => {
    const spacedStr = string.replace(/-/g, " ");
    const titleCaseWords = spacedStr.split(" ").map(word => {
        if (word.length === 0) {
            return "";
        }

        return (
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
    });

    return titleCaseWords.join(" ");
};

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
        <nav className="flex justify-between">
            <Link
                key={previousItem.slug}
                to={`/${subdirectory}/${previousItem.slug}`}
                className="w-1/2 p-4 flex hover:bg-gray-100">
                <div className="flex flex-col">
                    <div className="text-sm">Previous</div>
                    <div className="text-2xl">
                        {toSentenceCase(previousItem.slug)}
                    </div>
                </div>
            </Link>
            <Link
                key={nextItem.slug}
                to={`/${subdirectory}/${nextItem.slug}`}
                className="w-1/2 p-4 flex justify-end hover:bg-gray-100">
                <div className="flex flex-col">
                    <div className="text-sm">Next</div>
                    <div className="text-2xl">
                        {toSentenceCase(nextItem.slug)}
                    </div>
                </div>
            </Link>
        </nav>
    );
};

export default Pagination;
