import { MetadataRoute } from 'next'
import {siteConfig} from "@/config/site";
import { getGames } from '@/data/game';
import { GameScheme } from '@/data/types';
import { getSortedPostsData } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = `https://${siteConfig.domainName}`
    let pages = [
        "/",
        "/games",
        "/blog",
        "/sprunki-inverted",
        "/sprunki-modded-version",
        "/sprunkiwithoc2",
    ]
    const games = getGames('en');
    const gamesPages = games.map((game: GameScheme) => {
        return `/games/${game.slug}`
    })
    pages = pages.concat(gamesPages);


    const posts = getSortedPostsData('en');
    const postsPages = posts.map((post) => {
        return `/blog/${post.id}`
    })
    pages = pages.concat(postsPages);

    return pages.map((page) => {
        return {
            url: `${baseUrl}${page}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    })
}