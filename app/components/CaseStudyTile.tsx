import type { CaseStudyMeta } from "~/types";
import { Link } from "react-router";

const CaseStudyTile = ({
    caseStudy,
}: {
    caseStudy: CaseStudyMeta;
}) => {
    return (
        <Link to={`/design/${caseStudy.slug}`}>
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="w-full mb-4 aspect-3/2 object-cover border border-gray-200"
            />
            <div>
                <h2 className="mb-2 font-bold text-balance">
                    {caseStudy.title}
                </h2>
                <p className="mb-2">{caseStudy.description}</p>
            </div>
        </Link>
    );
};

export default CaseStudyTile;
