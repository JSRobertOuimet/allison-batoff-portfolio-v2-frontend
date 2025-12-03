import type { CaseStudyMeta } from "~/types/types";
import { Link } from "react-router";

const CaseStudyTile = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link to={`/design/${caseStudy.slug}`}>
            <div className="mb-8 flex flex-col gap-6 md:flex-row">
                <img
                    src={caseStudy.thumbnail?.imageUrl}
                    alt={caseStudy.thumbnail?.alternativeText}
                    className="border border-gray-300 md:w-1/3"
                />
                <div className="md:w-2/3">
                    <h3 className="mb-4 text-2xl font-bold">
                        {caseStudy.title}
                    </h3>
                    <p className="mb-4 text-gray-600">
                        {caseStudy.description}
                    </p>
                    <div className="text-sm md:text-balance">
                        <span>
                            {caseStudy.categories
                                .map((category) => category.category)
                                .join(" • ")}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CaseStudyTile;
