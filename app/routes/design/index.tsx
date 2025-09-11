import type { Route } from "../../+types/root";
import type {
    CaseStudyMeta,
    StrapiResponse,
    StrapiCaseStudy,
} from "~/types";
import PageHeading from "~/components/PageHeading";
import CaseStudyTile from "~/components/CaseStudyTile";
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

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/case-studies?sort=year:desc&populate=*`
    );
    const json: StrapiResponse<StrapiCaseStudy> = await res.json();
    const caseStudies = json.data.map(caseStudy => ({
        title: caseStudy.title,
        slug: caseStudy.slug,
        description: caseStudy.description,
        thumbnail: {
            imageUrl: caseStudy.thumbnail.url,
            alternativeText: caseStudy.thumbnail.alternativeText,
        },
        categories: caseStudy.categories.map(category => ({
            category: category.category,
        })),
    }));

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
    return (
        <>
            <PageHeading heading="Design" />

            <div className="grid grid-cols gap-8">
                {caseStudies.map(caseStudy => (
                    <CaseStudyTile
                        key={caseStudy.slug}
                        caseStudy={caseStudy}
                    />
                ))}
            </div>
        </>
    );
}
