import type { CaseStudyMeta } from "~/types/types";
import { Link } from "react-router";

const CaseStudyTile = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link
            to={`/design/${caseStudy.slug}`}
            className="relative aspect-square overflow-clip text-white outline-offset-8 md:aspect-2/1"
        >
            <div className="absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-tr from-black/90 to-black/10 p-4 md:p-8">
                <h3 className="mb-4 text-2xl text-balance text-shadow-lg lg:text-3xl">
                    {caseStudy.title}
                </h3>
                <p className="mb-4 hidden text-balance md:block">
                    {caseStudy.description}
                </p>
                <div className="text-sm text-balance">
                    <span>
                        {caseStudy.categories
                            .map((category) => category.category)
                            .join(" • ")}
                    </span>
                </div>
            </div>
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="absolute"
            />
        </Link>
    );
};

export default CaseStudyTile;
