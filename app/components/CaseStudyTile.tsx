import type { CaseStudyMeta } from "~/types";
import { Link } from "react-router";

const CaseStudyTile = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link
            to={`/design/${caseStudy.slug}`}
            className="flex flex-col md:flex-row p-4 gap-8 outline outline-gray-300 lg:outline-transparent lg:hover:outline lg:hover:outline-gray-300 lg:focus:outline lg:focus:outline-gray-300 transition duration-500 group">
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="md:w-1/3 aspect-square object-cover"
            />
            <div>
                <h2 className="text-2xl mb-4">{caseStudy.title}</h2>
                <p className="mb-6 text-gray-500">
                    {caseStudy.description}
                </p>
                <div className="group"></div>
                {caseStudy.categories.map((category, i) => (
                    <div
                        key={category.category}
                        style={
                            { ["--i" as any]: i } as React.CSSProperties
                        }
                        className="inline-block mr-2 mb-2 px-2 py-1 rounded-full border-1 border-gray-300 text-sm lg:opacity-0 transition-all duration-300 delay-[calc(var(--i)*90ms)] group-hover:opacity-100 group-focus:opacity-100">
                        {category.category}
                    </div>
                ))}
            </div>
        </Link>
    );
};

export default CaseStudyTile;
