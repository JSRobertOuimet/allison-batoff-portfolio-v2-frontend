interface PageHeadingProps {
    heading?: string;
    alignment?: string;
}

const PageHeading = ({ heading = "Heading", alignment }: PageHeadingProps) => {
    return (
        <h1
            className={`mb-8 ${alignment === "centered" ? "text-center" : ""} not-prose text-3xl text-balance`}
        >
            {heading}
        </h1>
    );
};

export default PageHeading;
