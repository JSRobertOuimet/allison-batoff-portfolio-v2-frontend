export type StrapiResponse<T> = {
    data: T[];
};

export type StrapiDestination = {
    thumbnail: {
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
    };
    location: string;
    slug: string;
    description: string;
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
    thumbnail?: {
        url: any;
        imageUrl: string;
        alternativeText: string;
    };
    title: string;
    slug: string;
    description: string;
    categories: {
        category: string;
    }[];
    year: string;
    duration: string;
    audience: string;
    isFeatured: boolean;
    body: string;
};

export type DestinationMeta = {
    thumbnail: {
        imageUrl: string;
        alternativeText: string;
    };
    location: string;
    slug: string;
};

export type Destination = {
    location: string;
    slug: string;
    description: string;
    photos: {
        documentId: string;
        imageUrl: string;
        alternativeText: string;
    }[];
};

export type CaseStudyMeta = {
    thumbnail: {
        imageUrl: string;
        alternativeText: string;
    } | null;
    title: string;
    slug: string;
    description: string;
    categories: {
        category: string;
    }[];
    isFeatured: boolean;
};

export type CaseStudy = {
    thumbnail: {
        url: any;
        imageUrl: string;
        alternativeText: string;
    };
    title: string;
    slug: string;
    year: string;
    duration: string;
    audience: string;
    body: string;
};
