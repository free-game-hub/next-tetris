import fs from 'fs';
import path from 'path';
import {GameScheme} from './types';
import {siteConfig} from "@/config/site";


const gameDir = "games";

export function getGames(locale: string): GameScheme[] {
    const gamesDirectory = path.join(process.cwd(), 'src', 'data', gameDir);
    const subDirectories = fs.readdirSync(gamesDirectory, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const games = subDirectories.map(subDir => {
        const filePath = path.join(gamesDirectory, subDir, `${locale}.json`);
        if (!fs.existsSync(filePath)) {
            console.warn(`文件不存在: ${filePath}`);
            return null;
        }

        console.log(`正在读取文件: ${filePath}`)
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const gameData = JSON.parse(fileContents) as GameScheme;

        const slug = subDir;
        gameData.slug = slug;

        const imageDataPath = path.join(process.cwd(), 'src', 'data', gameDir, slug, 'img_data.txt');
        const imageData = fs.readFileSync(imageDataPath, 'utf8');
        gameData.imageUrl = imageData.trim();
        if (!imageData.startsWith("https://")) {
            gameData.imageUrl = _doubleEncodeURL("https://s." + siteConfig.domainName + imageData);
        }

        return gameData;
    }).filter((game): game is GameScheme => game !== null)

    return games.reverse();
}

export function getGameBySlug(slug: string, locale: string): GameScheme | undefined {
    const games = getGames(locale);
    const game = games.find(game => game.slug === slug);
    if (game) {
        //先检查 iframe_data_v2.txt 是否存在
        const iframeDataPathV2 = path.join(process.cwd(), 'src', 'data', gameDir, slug, 'iframe_data_v2.txt');
        if (fs.existsSync(iframeDataPathV2)) {
            const iframeDataV2 = fs.readFileSync(iframeDataPathV2, 'utf8');
            game.iframeSrc = iframeDataV2.trim();
        } else {
            const iframeDataPath = path.join(process.cwd(), 'src', 'data', gameDir, slug, 'iframe_data.txt');
            const iframeData = fs.readFileSync(iframeDataPath, 'utf8');
            game.iframeSrc = iframeData.trim();
        }
        if (!game.iframeSrc.startsWith("https://") && !game.iframeSrc.startsWith("http://")) {
            game.iframeSrc = "https://s." + siteConfig.domainName + game.iframeSrc;
        }
    }
    return game
}

// 添加新方法
export function getGamesByMultipleSlugs(slugs: string[], locale: string): GameScheme[] {
    const games = getGames(locale);
    return slugs.map(slug => {
        const game = games.find(game => game.slug === slug);
        if (game) {
            return game;
        }
    }).filter((game): game is GameScheme => game !== undefined);
}

//随机 4 个游戏
export function getRandomGames(locale: string, count: number = 4): GameScheme[] {
    const games = getGames(locale);
    //添加过滤 hook
    const filteredGames = filterGames(games);
    return filteredGames.sort(() => Math.random() - 0.5).slice(0, count);
}

function filterGames(games: GameScheme[]): GameScheme[] {
    const excludedGames = [
        'bull-run',
        'road-surfers',
        'grand-cyber-city-game',
        'gold-runner'
    ];
    return games.filter(game => !excludedGames.includes(game.slug));
}

function _doubleEncodeURL(url: string): string {
    const urlObj = new URL(url);
    const segments = urlObj.pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    const encodedSegment = encodeURIComponent(lastSegment);
    const newPathname = segments.slice(0, -1).join('/') + '/' + encodedSegment;
    return urlObj.origin + newPathname + urlObj.search;
}