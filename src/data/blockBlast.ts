import {getDataBySlug, getDataList} from "./data"

const gameDir = "block-blast"
export function getGames(locale: string) {
    return getDataList(gameDir, locale);
}

export function getGameBySlug(slug: string, locale: string) {
    return getDataBySlug(gameDir, slug, locale)
}