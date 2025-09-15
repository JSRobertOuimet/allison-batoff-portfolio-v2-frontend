interface PageHeadingProps {
    heading?: string;
    alignment?: string;
}

const PageHeading = ({
    heading = "Heading",
    alignment,
}: PageHeadingProps) => {
    return (
        <h1
            className={`mb-8 ${alignment === "centered" ? "text-center" : ""} text-3xl text-balance not-prose`}>
            {heading}
        </h1>
    );
};

export default PageHeading;
