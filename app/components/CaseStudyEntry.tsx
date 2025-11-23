import type { CaseStudyMeta } from "~/types";
import { Link } from "react-router";

const CaseStudyEntry = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link
            to={`/design/${caseStudy.slug}`}
            className="block py-6 outline-offset-8"
        >
            <div>
                <h3 className="mb-4 font-bold underline">{caseStudy.title}</h3>
                <p className="mb-4 text-gray-600">{caseStudy.description}</p>
                <div className="text-sm">
                    <span>
                        {caseStudy.categories
                            .map((category) => category.category)
                            .join(" • ")}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CaseStudyEntry;
