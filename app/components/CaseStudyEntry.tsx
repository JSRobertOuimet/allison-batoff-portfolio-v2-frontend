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
                <div className="group"></div>
                {caseStudy.categories.map((category, i) => (
                    <div
                        key={category.category}
                        style={{ ["--i" as any]: i } as React.CSSProperties}
                        className="not-last:mr-2 mb-2 inline-block rounded-sm border-1 border-gray-400 px-1 py-0.5 text-sm"
                    >
                        {category.category}
                    </div>
                ))}
            </div>
        </Link>
    );
};

export default CaseStudyEntry;
