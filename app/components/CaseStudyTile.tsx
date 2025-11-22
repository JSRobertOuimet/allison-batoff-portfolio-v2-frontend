import type { CaseStudyMeta } from "~/types";
import { Link } from "react-router";

const CaseStudyTile = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link
            to={`/design/${caseStudy.slug}`}
            className="relative aspect-3/2 overflow-clip text-white outline-offset-8 md:first:row-span-2 md:first:aspect-auto md:nth-2:row-span-1 md:nth-2:aspect-3/2 md:nth-3:row-span-1 md:nth-3:aspect-3/2"
        >
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-linear-to-t from-black/90 to-black/10 p-8">
                <h3 className="mb-2 text-center text-2xl text-balance text-shadow-lg lg:text-3xl">
                    {caseStudy.title}
                </h3>
                <div className="flex flex-wrap justify-center text-center text-balance">
                    <span className="text-sm">
                        {caseStudy.categories
                            .map((category) => category.category)
                            .join(" • ")}
                    </span>
                </div>
            </div>
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="absolute w-full"
            />
        </Link>
    );
};

export default CaseStudyTile;
