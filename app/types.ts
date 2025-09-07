export type StrapiResponse<T> = {
    data: T[];
};

export type StrapiDestination = {
    location: string;
    description: string;
    slug: string;
    thumbnail: {
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
    };
    photos: {
        documentId: string;
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
    }[];
};

export type StrapiCaseStudy = {
    title: string;
    description: string;
    body: string;
    year: string;
    slug: string;
    duration: string;
    audience: string;
    thumbnail: {
        url: any;
        imageUrl: string;
        alternativeText: string;
    };
    categories: {
        category: string;
    }[];
};

export type DestinationMeta = {
    location: string;
    slug: string;
    thumbnail: {
        imageUrl: string;
        alternativeText: string;
    };
};

export type Destination = {
    location: string;
    description: string;
    slug: string;
    photos: {
        documentId: string;
        imageUrl: string;
        alternativeText: string;
    }[];
};

export type CaseStudyMeta = {
    title: string;
    description: string;
    slug: string;
    thumbnail: {
        imageUrl: string;
        alternativeText: string;
    };
    categories: {
        category: string;
    }[];
};
