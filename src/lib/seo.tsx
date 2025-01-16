import type {Metadata} from "next";
import {siteConfig} from "@/config/site";
import defaultOGImage from '@/app/opengraph-image.jpg';
import {defaultLocale, localeDetails, locales} from "@/i18n/routing";
import {getLocale} from "next-intl/server";

// These are all the SEO tags you can add to your pages.
// It prefills data with default title/description/OG, etc.. and you can cusotmize it for each page.
// It's already added in the root layout.js so you don't have to add it to every pages
// But I recommend to set the canonical URL for each page (export const metadata = getSEOTags({canonicalUrlRelative: "/"});)
// See https://shipfa.st/docs/features/seo
export const getSEOTags = async ({
                                     title,
                                     path,
                                     i18n = true,
                                     description,
                                     keywords,
                                     openGraph,
                                     extraTags,
                                     images,
                                 }: Metadata & {
    path: string;
    i18n?: boolean
    extraTags?: Partial<Metadata>;
    images?: Array<{
        url: string;
        width: number;
        height: number;
    }>;
}) => {
    const l = await getLocale()
    const currentLocale = l as keyof typeof localeDetails;

    let canonical = trimSlash('/' + (currentLocale == defaultLocale ? '' : currentLocale) + path)
    const alternates: Record<string, string> = {};

    // 设置默认图片
    const defaultImage = [{
        url: defaultOGImage.src,
        width: defaultOGImage.width,
        height: defaultOGImage.height,
    }];
    if (i18n) {
        for (const loc of locales) {
            alternates[localeDetails[loc].code] = trimSlash(`https://${siteConfig.domainName}` + ((loc === defaultLocale) ? path : `/${loc}` + path))
        }
    } else  {
        canonical = trimSlash(`https://${siteConfig.domainName}` + path)
    }

    return {
        // up to 50 characters (what does your app do for the user?) > your main should be here
        title: title || siteConfig.appName,
        // up to 160 characters (how does your app help the user?)
        description: description,
        // some keywords separated by commas. by default it will be your app name
        keywords: keywords || [siteConfig.appName],
        applicationName: siteConfig.appName,
        // set a base URL prefix for other fields that require a fully qualified URL (.e.g og:image: og:image: 'https://yourdomain.com/share.png' => '/share.png')
        metadataBase: new URL(
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000/"
                : `https://${siteConfig.domainName}/`
        ),

        openGraph: {
            title: openGraph?.title || siteConfig.appName,
            description: openGraph?.description || siteConfig.appDescription,
            url: canonical,
            siteName: openGraph?.title || siteConfig.appName as string,
            // If you add an opengraph-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
            // images: [
            //   {
            //     url: `https://${config.domainName}/share.png`,
            //     width: 1200,
            //     height: 660,
            //   },
            // ],
            images: images && images.length > 0 ? images : defaultImage,
            type: "website",
        },

        twitter: {
            title: openGraph?.title || siteConfig.appName,
            description: openGraph?.description,
            // If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
            images: defaultImage,
            card: "summary_large_image",
            creator: "@sunoMP3",
        },

        // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
        alternates: {
            canonical: canonical,
            languages: alternates
        },

        // If you want to add extra tags, you can pass them here
        ...extraTags,
    };
};

// Strctured Data for Rich Results on Google. Learn more: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// Find your type here (SoftwareApp, Book...): https://developers.google.com/search/docs/appearance/structured-data/search-gallery
// Use this tool to check data is well structure: https://search.google.com/test/rich-results
// You don't have to use this component, but it increase your chances of having a rich snippet on Google.
// I recommend this one below to your /page.js for software apps: It tells Google your AppName is a Software, and it has a rating of 4.8/5 from 12 reviews.
// Fill the fields with your own data
// See https://shipfa.st/docs/features/seo
export const renderSchemaTags = () => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "SoftwareApplication",
                    name: siteConfig.appName,
                    //todo 多语言
                    //description: config.appDescription,
                    image: `https://${siteConfig.domainName}/icon.png`,
                    url: `https://${siteConfig.domainName}/`,
                    author: {
                        "@type": "Person",
                        name: "Marc Lou",
                    },
                    datePublished: "2023-08-01",
                    applicationCategory: "EducationalApplication",
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.8",
                        ratingCount: "12",
                    },
                    offers: [
                        {
                            "@type": "Offer",
                            price: "9.00",
                            priceCurrency: "USD",
                        },
                    ],
                }),
            }}
        ></script>
    );
};

function trimSlash(str: string) {
    return str.replace(/^\/|\/$/g, "");
}