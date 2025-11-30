export type SeoMeta = {
    id?: number;

    title: string;
    description: string;
    keywords: string;

    canonicalUrl: string;
    imageUrl: string;

    ogType: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;

    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;

    jsonLd: string;
};
