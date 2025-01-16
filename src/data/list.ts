export interface GameItem {
    title: string;
    description: string;
    url: string;
    gameUrl?: string;
    image: string;
}

const imgBase = "/game-thumbnail/";

export const games: GameItem[] = [
    {
        title: "Bad Parenting",
        description: "Play Bad Parenting",
        url: "https://badparenting.online/",
        image: imgBase + "bad-parenting-500x300.jpg"
    },
    {
        title: "Subway Surfers",
        description: "Play Subway Surfers Unblocked",
        url: "https://subwaysurfersunblocked.org/",
        image: imgBase + "subwaysurfersunblocked-500x300.jpg"
    },
    {
        title: "Rhythm Hell",
        description: "Play Rhythm Hell",
        url: "https://rhythmhell.com/",
        image: "/img/recommends/rh-300.jpg"
    },
    {
        title: "Block Blast",
        description: "Play Block Blast",
        url: "https://block-blast.best/",
        image: imgBase + "block-blast-500x300.jpg"
    },
]