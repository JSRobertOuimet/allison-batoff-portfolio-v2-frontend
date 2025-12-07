// General-purpose

export type StrapiResponse<T> = {
    data: T[];
};

export type Image = {
    documentId: string;
    alternativeText: string;
    url: string;
};

// Destinations

export type StrapiDestination = {
    documentId: string;
    description: string;
    slug: string;
    location: string;
    thumbnail: Image;
    photos: Image[];
};

export type DestinationMeta = {
    documentId: string;
    slug: string;
    location: string;
    thumbnail: Image;
};

export type Destination = {
    description: string;
    slug: string;
    location: string;
    photos: Image[];
};

// Case Studies

export type StrapiCaseStudy = {
    title: string;
    description: string;
    body: string;
    year: string;
    slug: string;
    duration: string;
    audience: string;
    isFeatured: boolean;
    thumbnail: Image | null;
    categories: {
        category: string;
    }[];
};

export type CaseStudyMeta = {
    title: string;
    description: string;
    slug: string;
    isFeatured: boolean;
    thumbnail: Image | null;
    categories: {
        category: string;
    }[];
};

export type CaseStudy = {
    title: string;
    year: string;
    slug: string;
    duration: string;
    audience: string;
    body: string;
};
