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
        documentId: string,
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
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
        documentId: string,
        imageUrl: string;
        alternativeText: string;
    }[];
};
