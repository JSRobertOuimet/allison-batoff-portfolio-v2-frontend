import type { CaseStudyMeta } from "~/types";
import { Link } from "react-router";

const CaseStudyTile = ({ caseStudy }: { caseStudy: CaseStudyMeta }) => {
    return (
        <Link to={`/design/${caseStudy.slug}`} className="p-4 flex gap-8 outline-transparent hover:outline hover:outline-gray-300 focus:outline focus:outline-gray-300 transition duration-500">
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="w-1/3 aspect-square object-cover"
            />
            <div>
                <h2 className="text-2xl mb-4">{caseStudy.title}</h2>
                <p className="mb-6">{caseStudy.description}</p>
                {caseStudy.categories.map(category => (
                    <span key={category.category} className="mr-4 px-2 py-1 rounded-full border-1 border-gray-300 text-sm">
                        {category.category}
                    </span>
                ))}
            </div>
        </Link>
    );
};

export default CaseStudyTile;
