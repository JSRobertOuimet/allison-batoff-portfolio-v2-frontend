import type { Route } from "./+types";
import type {
    StrapiResponse,
    StrapiCaseStudy,
    CaseStudy,
} from "~/types";
import PageHeading from "~/components/PageHeading";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Pagination from "~/components/Pagination";

type CaseStudyDetailsPageProps = {
    loaderData: {
        caseStudy: CaseStudy;
        previousCaseStudy: CaseStudy;
        nextCaseStudy: CaseStudy;
    };
};

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params as { slug: string };
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/case-studies?sort=year:desc&populate=*`
    );
    const json: StrapiResponse<StrapiCaseStudy> = await res.json();
    const caseStudies = json.data.map(caseStudy => ({
        thumbnail: {
            imageUrl: caseStudy.thumbnail.url,
            alternativeText: caseStudy.thumbnail.alternativeText,
        },
        title: caseStudy.title,
        slug: caseStudy.slug,
        year: caseStudy.year,
        duration: caseStudy.duration,
        audience: caseStudy.audience,
        body: caseStudy.body,
    }));
    const currentIndex = caseStudies.findIndex(
        caseStudy => caseStudy.slug === slug
    );
    const caseStudy = caseStudies[currentIndex];
    const previousCaseStudy =
        caseStudies[currentIndex - 1] ||
        caseStudies[caseStudies.length - 1];
    const nextCaseStudy =
        caseStudies[currentIndex + 1] || caseStudies[0];

    return { caseStudy, previousCaseStudy, nextCaseStudy };
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

const DesignDetailsPage = ({
    loaderData,
}: CaseStudyDetailsPageProps) => {
    const { caseStudy, previousCaseStudy, nextCaseStudy } = loaderData;

    console.log(previousCaseStudy);

    return (
        <>
            <img
                src={caseStudy.thumbnail.imageUrl}
                alt={caseStudy.thumbnail.alternativeText}
                className="w-full aspect-16/9 object-cover mb-8"
            />
            <div className="w-2/5 mx-auto">
                <PageHeading heading={caseStudy.title} />
                <div className="prose max-w-none mb-12">
                    <Markdown rehypePlugins={[rehypeRaw]}>
                        {caseStudy.body}
                    </Markdown>
                </div>
                <Pagination
                    subdirectory="design"
                    previousItem={previousCaseStudy}
                    nextItem={nextCaseStudy}
                />
            </div>
        </>
    );
};

export default DesignDetailsPage;
