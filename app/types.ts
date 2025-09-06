export type Destination = {
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
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
    }[];
};

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
        alternativeText: string;
        formats: {
            large: {
                url: string;
            };
        };
    }[];
};
