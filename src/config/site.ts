export const siteConfig = {
    // REQUIRED
    appName: "Sprunki Infected",
    domainName: "sprunkiinfected.org",
    appDescription: "Play Sprunki Infected",
    github: "https://github.com/gangbo/sprunkiinfected.org.site",
    gameUrl: "https://s.sprunkiinfected.org",
}



interface recommendation {
    title: string;
    description: string;
    url: string;
    image: string;
}

export const recommendations: recommendation[] = [
    {
        title: "Colorbox Mustard",
        description: "Play Colorbox Mustard",
        url: "https://colorboxmustard.best/",
        image: "/img/recommends/s1-300.jpg"
    },
    {
        title: "Bad Parenting",
        description: "Play Bad Parenting",
        url: "https://badparenting.online/",
        image: "/img/recommends/bap1-300.jpg"
    },
    {
        title: "Subway Surfers",
        description: "Play Subway Surfers Unblocked",
        url: "https://subwaysurfersunblocked.org/",
        image: "/img/recommends/subway-300.jpg"
    },
    {
        title: "Rhythm Hell",
        description: "Play Rhythm Hell",
        url: "https://rhythmhell.com/",
        image: "/img/recommends/rh-300.jpg"
    },
]