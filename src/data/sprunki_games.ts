import { siteConfig } from "@/config/site";
import {GameItem} from "@/data/list";

const imgBase = "/game-thumbnail/"
export const sprunkiGames: GameItem[] = [
    {
        title: "Abgerny Goblos - Immerse in Goblin Music Adventure",
        description:"Experience an adventurous music-making journey with Abgerny Goblos",
        url: "/games/abgerny-goblos",
        image: `https://s.${siteConfig.domainName}/images/sprunki/abgerny-goblos1-568x320.avif`
    },
    {
        title: "Parasprunki but Better Mod",
        description: "Parasprunki but Better Mod - Enhanced Music-Making Experience",
        url: "/games/parasprunki-but-better",
        image: `https://s.${siteConfig.domainName}/images/sprunki/parasprunki-but-better-568x320.avif`
    },
    {
        title: "Sprunkis World",
        description: "Play Sprunkis World",
        url: "/sprunki-world",
        image: imgBase + "sprunki-world-500x300.jpg"
    },
    {
        title: "Sprunki Inverted",
        description: "Play Sprunki Inverted",
        url: "/sprunki-inverted",
        image: imgBase + "sprunki-inverted-500x300.jpg"
    },
    {
        title: "Sprunki OC",
        description: "Play Sprunki OC",
        url: "/sprunkiwithoc2",
        image: imgBase + "sprunkiwithoc2-500x300.jpg"
    },
    {
        title: "Sprunki Modded",
        description: "Play Sprunki Modded",
        url: "/sprunki-modded-version",
        image: imgBase + "sprunki-modded-version-500x300.jpg"
    },

]