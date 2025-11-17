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
import { requireAuth } from "~/utils/auth.server";

type LoaderData = {
    caseStudy: CaseStudy;
    previousCaseStudy: CaseStudy;
    nextCaseStudy: CaseStudy;
};

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params as { slug: string };

    await requireAuth(request);

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/case-studies?sort=year:desc&populate=*`
    );
    const json: StrapiResponse<StrapiCaseStudy> = await res.json();
    const caseStudies = json.data.map(caseStudy => ({
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

export function meta({ data }: { data: LoaderData }) {
    return [
        { title: `${data.caseStudy.title} | Allison Batoff` },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

const DesignDetailsPage = ({
    loaderData,
}: {
    loaderData: LoaderData;
}) => {
    const { caseStudy, previousCaseStudy, nextCaseStudy } = loaderData;

    return (
        <>
            <div className="mx-auto max-w-none prose prose-h2:font-normal prose-h2:mt-0 prose-h2:mb-4 prose-h3:font-normal prose-h3:mt-0 prose-blockquote:text-2xl prose-blockquote:font-normal prose-img:border prose-img:border-gray-300">
                <PageHeading
                    heading={caseStudy.title}
                    alignment="centered"
                />
                <ul className="pl-0 content">
                    <li className="flex mt-0 mb-0 pl-0 py-4 list-none border-b-1 border-gray-300">
                        <div className="w-1/3 font-bold">Year(s)</div>
                        <div className="w-full pl-4">
                            {caseStudy.year}
                        </div>
                    </li>
                    <li className="flex mt-0 mb-0 pl-0 py-4 list-none border-b-1 border-gray-300">
                        <div className="w-1/3 font-bold">Duration</div>
                        <div className="w-full pl-4">
                            {caseStudy.duration}
                        </div>
                    </li>
                    <li className="flex mt-0 mb-0 pl-0 py-4 list-none">
                        <div className="w-1/3 font-bold">Audience</div>
                        <div className="w-full pl-4">
                            {caseStudy.audience}
                        </div>
                    </li>
                </ul>
                <div className="content mb-12">
                    <Markdown rehypePlugins={[rehypeRaw]}>
                        {caseStudy.body}
                    </Markdown>
                </div>
                <div className="content">
                    <Pagination
                        subdirectory="design"
                        previousItem={previousCaseStudy}
                        nextItem={nextCaseStudy}
                    />
                </div>
            </div>
        </>
    );
};

export default DesignDetailsPage;
