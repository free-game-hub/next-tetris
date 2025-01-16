import type { MetadataRoute } from 'next'
import { headers } from 'next/headers';
import {siteConfig} from "@/config/site";

export const runtime = 'edge'

export default function robots(): MetadataRoute.Robots {
    const host = headers().get("host") || '';
    if (host !== siteConfig.domainName) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }
    if (process.env.NODE_ENV !== 'production') {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/_next/',
        },
        sitemap: `https://${siteConfig.domainName}/sitemap.xml`,
    }
}