interface PageHeadingProps {
    heading?: string;
}

const PageHeading = ({ heading = "Heading" }: PageHeadingProps) => {
    return <h1 className="text-3xl mb-8">{heading}</h1>;
};

export default PageHeading;
