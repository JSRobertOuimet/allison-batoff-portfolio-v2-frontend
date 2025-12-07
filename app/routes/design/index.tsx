import type { Route } from "../../+types/root";
import type {
    StrapiResponse,
    StrapiCaseStudy,
    CaseStudyMeta,
} from "~/types/types";
import PageHeading from "~/components/PageHeading";
import CaseStudyTile from "~/components/CaseStudyTile";
import CaseStudyEntry from "~/components/CaseStudyEntry";
import { requireAuth } from "~/utils/auth.server";

type DesignPageProps = {
    loaderData: {
        caseStudies: CaseStudyMeta[];
    };
};

export async function loader({
    request,
}: Route.LoaderArgs): Promise<{ caseStudies: CaseStudyMeta[] }> {
    await requireAuth(request);

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/case-studies?sort=year:desc&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
        },
    );

    const json: StrapiResponse<StrapiCaseStudy> = await response.json();
    const caseStudies = json.data.map((caseStudy) => {
        return {
            title: caseStudy.title,
            description: caseStudy.description,
            slug: caseStudy.slug,
            isFeatured: caseStudy.isFeatured,
            thumbnail: caseStudy.thumbnail
                ? {
                      documentId: caseStudy.thumbnail.documentId,
                      alternativeText: caseStudy.thumbnail.alternativeText,
                      url: caseStudy.thumbnail.url,
                  }
                : null,
            categories: Array.isArray(caseStudy.categories)
                ? caseStudy.categories
                : [],
        };
    });

    return { caseStudies };
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Design | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function DesignPage({ loaderData }: DesignPageProps) {
    const { caseStudies } = loaderData;
    const featuredCaseStudies = caseStudies.filter(
        (caseStudy) => caseStudy.isFeatured,
    );
    const pastCaseStudies = caseStudies.filter(
        (caseStudy) => !caseStudy.isFeatured,
    );

    return (
        <>
            <PageHeading heading="Design" />
            {!featuredCaseStudies.length ? (
                <div className="lg:w-2/3 xl:w-1/2">
                    <div className="divide-y divide-gray-300">
                        {caseStudies.map((caseStudy, i) => (
                            <CaseStudyEntry key={i} caseStudy={caseStudy} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-4 grid">
                        <h2 className="mb-8 text-2xl">Featured Work</h2>
                        {featuredCaseStudies.map((caseStudy, i) => (
                            <CaseStudyTile key={i} caseStudy={caseStudy} />
                        ))}
                    </div>
                    <div className="lg:mx-auto lg:w-1/2">
                        <h2 className="text-2xl">Past Work</h2>
                        <div className="divide-y divide-gray-300">
                            {pastCaseStudies.map((caseStudy, i) => (
                                <CaseStudyEntry key={i} caseStudy={caseStudy} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
