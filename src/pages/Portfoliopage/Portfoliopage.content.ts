import { type Language } from "../../assets/LanguageContext"

/* Written entirely locally, no REST fetching */

export interface LocalizedText {
    fi: string;
    en: string;
}

export interface Timeframe {
    year: number;
    month?: number;      
    endYear?: number;
    endMonth?: number;
    approximate?: boolean;  // True if not sure about exact dates
}

export interface PortfolioProject {
    title: LocalizedText;
    timeframe: Timeframe;
    descriptors: LocalizedText[];
    tools: LocalizedText[];
}

export interface PortfolioField {
    fieldname: LocalizedText;
    projects: PortfolioProject[];
}

export interface PortfolioPageContent {
    intro: LocalizedText;
    fields: PortfolioField[];
}

const monthNames: Record<Language, string[]> = {
    fi: [
        "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
        "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu",
    ],
    en: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ],
};

function formatPoint(lang: Language, year: number, month?: number): string {
    if (month === undefined) return `${year}`;
    return `${monthNames[lang][month - 1]} ${year}`;
}

export function formatTimeframe(tf: Timeframe, lang: Language): string {
    if (tf.endYear !== undefined) {
        const start = formatPoint(lang, tf.year, tf.month);
        const end = formatPoint(lang, tf.endYear, tf.endMonth);
        return `${start} \u2013 ${end}`;
    }
    const point = formatPoint(lang, tf.year, tf.month);
    if (tf.approximate) {
        return lang === "fi" ? `Noin ${point}` : `Around ${point}`;
    }
    return point;
}

export const static_content: PortfolioPageContent = {
    intro: {
        fi: "Tällä sivulla on listattuna joitain projektejani eri aloilla.",
        en: "On this page you can find some of my projects in different fields.",
    },
    fields: [
        {
            fieldname: {
                fi: "Ohjelmointi ja tietojenkäsittely",
                en: "Computer science and programming",
            },
            projects: [
                // Henkimaailma 2.0
                {
                    title: { fi: "Henkimaailma 2.0", en: "Personal webpage 2.0" },
                    timeframe: { year: 2026, month: 8 },
                    descriptors: [
                        {
                            fi: "Vanhasta kotisivusta mukailtu, kokonaan uudestaan Typescriptillä kirjoitettu versio kotisivuistani",
                            en: "A Typescript rewrite of my old homepage",
                        },
                        {
                            fi: "Vanha sivu oli hankalahkosti päivitettävissä, koska ensimmäisenä suurena Javascript-projektinani sen koodi oli melkoista spagettia; halusin luoda samoja toiminnallisuuksia modernimmalla stackilla",
                            en: "The old site was cumbersome to update; as my first larger Javascript project the code had eventually spaghetti-fied. I wanted to recreate the site with a more modern stack.",
                        },
                        {
                            fi: "Vain muutama sisältö (kuten portfoliosivu mukaan lukien) on hardkoodattu frontendiin, kaikki muu sivusisältö haetaan backendistä",
                            en: "A minority of the content (such as this portfolio page) is hardcoded to the frontend, all other site content is fetched from the backend API",
                        },
                        {
                            fi: "Data on tallennettu PostgreSQL-tietokantaan, jota voi halutessaan koulia Django-backendistä",
                            en: "Site data is saved to a PostgreSQL database that can be interacted with via the backend implemented with Django.",
                        },
                    ],
                    tools: [
                        { fi: "Typescript, React, Vite, Docker, Python, Django, PostgreSQL", en: "Typescript, React, Vite, Docker, Python, Django, PostgreSQL" },
                        { fi: "Hostaus: Google Cloud, Netlify", en: "Hosting: Google Cloud, Netlify" },
                        {
                            fi: "Tekoälytyökalut: Claudea käytetty apuna arkkitehtuurin suunnittelemiseen ja hankalampien konseptien selittämiseen",
                            en: "AI tools: Claude has been used to help design the architecture and to explain more difficult concepts",
                        },
                    ],
                },
                // 2) Discogs mirror
                {
                    title: { fi: "Discogs -datan lokaali käsittelijä", en: "Discogs music metadata mirror" },
                    timeframe: { year: 2026, month: 6 },
                    descriptors: [
                        {
                            fi: "Singalle kehittämästäni työkalusta mukailtu työkalu, jonka avulla koko Discogsin sisältämää musiikkimetadata voidaan hakea lokaalisti",
                            en: "A tool adopted from tools I developed for Singa. The tool allows for local searching of all of the music metadata hosted in the music collecting service Discogs.",
                        },
                        {
                            fi: "Koska työkalu on jatkojalostettu Singalle kehittämistäni työkaluista, on avoimen lähdekoodin versio julkaistu Singan luvalla",
                            en: "As the tool is derived from tools I developed at Singa, the open-source tool is released with permission from Singa",
                        },
                        {
                            fi: "Työkalu hakee Discogsin kuukausittain julkaiseman datadumpin ja parsii sen lokaaliin PostgreSQL -tietokantaan",
                            en: "Tool downloads the monthly published Discogs data dump and parses it into a local PostgreSQL database",
                        },
                    ],
                    tools: [
                        { fi: "Python, Docker, PostgreSQL", en: "Python, Docker, PostgreSQL" },
                    ],
                },
                // 3) ffmpeg converter
                {
                    title: { fi: "Musiikkikirjaston ffmpeg-konvertteri", en: "Music library ffmpeg converter" },
                    timeframe: { year: 2026, month: 5 },
                    descriptors: [
                        {
                            fi: "Python-ohjelma, joka ei-tuhoavasti muuntaa sille syötetyn musiikkikirjastokansion kaikki tiedostot pienempään kokoon ja .mp3 -containeriin",
                            en: "Python program that non-destructively converts all of the music files in the input music library folder to a smaller filesize and to an .mp3 -container",
                        },
                        {
                            fi: "Konvertterin pitäisi teoriassa toimia myös toiseen suuntaan, mutta en itse ole alkanut tarkistamaan toiminnallisuutta koska tarvitsin itse vain ohjelman, joka muuttaa tiedostot .mp3:ksi",
                            en: "Converter should in theory work in both ways, but I haven't developed or checked the functionality since I only needed a one-time conversion of all my files into .mp3",
                        },
                    ],
                    tools: [
                        { fi: "Python", en: "Python" },
                    ],
                },
                // 4) Singa työkalut
                {
                    title: {
                        fi: "Musiikkimetadatatyökalujen kehittäminen Singa Oy:llä",
                        en: "Developed music metadata tools for Singa",
                    },
                    timeframe: { year: 2025, month: 11, endYear: 2026, endMonth: 5 },
                    descriptors: [
                        {
                            fi: "Työskentelin karaokeyritys Singalla harjoittelussa osana Cloud & DevOps F.E.C. -koulutusohjelmaa",
                            en: "I worked at the Finnish karaoke company Singa as a trainee in a Cloud & DevOps F.E.C. program",
                        },
                        {
                            fi: "Singalla kehitin työkaluja musiikkimetadatan koneelliseen etsimiseen ja tuomiseen sisäiseen järjestelmään",
                            en: "I developed tools to automatically search and import music metadata into Singa's internal system",
                        },
                    ],
                    tools: [
                        { fi: "Python, REST-API:t, SQLite", en: "Python, REST-API:t, SQLite" },
                        { fi: "Tekoälytyökalut: Codex, Claude, ChatGPT", en: "AI tools: Codex, Claude, ChatGPT" },
                    ],
                },
                // 5) Gameplay footage reporter
                {
                    title: { fi: "Gameplay footage -raportoija", en: "Gameplay footage reporter" },
                    timeframe: { year: 2025, month: 10 },
                    descriptors: [
                        {
                            fi: "Python-ohjelma, joka tutkii kovalevyltäni pelivideomateriaalikansion ja laatii dataraportin videotiedostoista",
                            en: "Python-program that investigates gameplay video footage on my hard drive and generates a data report on the video files",
                        },
                        {
                            fi: "Tuotan harrastuksenani YouTubeen peliarvosteluvideoita, ja nauhoitan sen myötä erittäin paljon videomateriaalia, joka vie paljon tallennustilaa",
                            en: "I produce as a hobby video game reviews into YouTube, and end up amassing massive amounts of gameplay footage from various games",
                        },
                        {
                            fi: "Dataraportti kertoo, kuinka paljon tilaa kunkin pelin videotiedostot vievät, kuinka monta videoklippiä kustakin pelistä on, kuinka pitkiä klipit keskimäärin ovat ja kuinka paljon tilaa pelin materiaali vie suhteessa pelimateriaalin pituuteen",
                            en: "The data report helps identify which games' footage takes an unproportionate amount of disk space and tells how many video clips exist of each game, how long the clips are on average and how much storage the clips require in proportion to video clip length",
                        },
                        {
                            fi: "Raportti auttaa karsimaan liikaa materiaalia ja tunnistamaan, ovatko pelivideot enkoodattu sopivan kokoiseen tiedostomuotoon (moderni peli tarvitsee enemmän bitratea kuin NES-peli) jättäen kuitenkin lähdeklippejä kaikista peleistä, joihin haluan ehkä tulevaisuudessa viitata",
                            en: "Report helps cut down unnecessary material while still retaining material to use if I want to refer to a any game in the future. File size to video length- ratio helps identify footage that can be re-encoded to fit in a smaller file size without losing video quality (modern games need more storage space than NES games)",
                        },
                        {
                            fi: "Datasta luodaan raakaa HTML:ää käyttävä sivu, jolla dataa voi järjestellä ja lukea",
                            en: "From data is generated a raw HTML page where the data can be browsed and reordered",
                        },
                    ],
                    tools: [
                        { fi: "Python", en: "Python" },
                    ],
                },
                // 6) 3D liukuhihnat GZDoom
                {
                    title: { fi: "3D -liukuhihnat GZDoomissa", en: "3D Conveyor belts in GZDoom" },
                    timeframe: { year: 2025, month: 2 },
                    descriptors: [
                        { fi: "Toinen peliohjelmointiharjoite", en: "Another game programming exercise" },
                        {
                            fi: "GZDoom -sourceport ei tue 3D-platformeja, jotka kuljettavat lattian tekstuureja ja liikuttavat esineitä platformin päällä; Kehitin ratkaisun, jolla kenttäsuunnittelijat voivat saavuttaa efektin",
                            en: "The GZDoom source port for Doom doesn't support 3D platforms that move textures and objects on top of them; I developed a workaround that allows mapmakers to achieve that effect",
                        },
                        {
                            fi: "Skripti tarkistaa pelaajan tai muiden esineiden koordinaatit kartassa suhteessa liukuhihnana toimivan tason alku- ja päätepisteeseen ja liikuttaa olioita tasolla niin kauan, kun ne ovat sijoittuneita jonnekin tasolla.",
                            en: "The script checks the player or other objects position in the map relative to the starting and ending coordinates of the platform acting as the conveyor belt and moves actors on the platform as long as they are still positioned somewhere on said platform",
                        },
                        {
                            fi: "Pelimoottorirajoituksista johtuen liukuhihnatason muoto ja kulma on pääteltävä käyttäen trigonometriaa",
                            en: "Due to engine limitations, the exact shape and orientation of the platform needs to be deduced using trigonometry",
                        },
                    ],
                    tools: [
                        { fi: "GZdoom, Zscript", en: "GZdoom, Zscript" },
                    ],
                },
                // 7) Fantasy map generator
                {
                    title: { fi: "Fantasiakarttojen generointiohjelmisto", en: "Fantasy map generator" },
                    timeframe: { year: 2023, approximate: true },
                    descriptors: [
                        {
                            fi: "Python-ohjelma, joka generoi maantieteellisesti uskottavia maailmoja heksagridissä. Roolipelien pelinjohtajille inspiraatioksi tai hahmotteluksi, miten proseduaalisesti luotujen karttojen generointi onnistuu.",
                            en: "Python program, that generates geographically plausible fantasy worlds in a hex grid. To be used as inspiration in tabletop RPG games or as a sketch of how one would approach procedurally generating maps",
                        },
                        {
                            fi: "Ohjelmiston luomat kartat ovat editoitavissa Tiled-ohjelmistolla",
                            en: "Generated maps are editable with the tilemap editing software Tiled",
                        },
                        {
                            fi: "Semihylätty, alkutekijöissään oleva projekti, joka tulisi aloittaa uudestaan nyt kun Python-osaaminen on aavistuksen parempaa",
                            en: "Semi-abandoned project in its infancy. I should reboot it now that I know Python a little better",
                        },
                    ],
                    tools: [
                        { fi: "Python", en: "Python" },
                        { fi: "Adobe Photoshop (grafiikat)", en: "Adobe Photoshop (graphics editing)" },
                    ],
                },
                // 8) Jives bot 
                {
                    title: { fi: "Levyraatibotti Jives", en: "Music review service bot Jives" },
                    timeframe: { year: 2023, approximate: true },
                    descriptors: [
                        {
                            fi: "Kotisivujeni oheen luotu levyraatibotti, jonka kanssa voi vuorovaikuttaa Discord-serverilläni",
                            en: "A bot that coexists with the first version of my homepage. You can interact with the bot in my Discord server",
                        },
                        {
                            fi: "Botille voi lähettää Spotify-linkkejä, ja tämä luo albumeista threadin Discordiin ja lisää albumin levyraadin tietokantaan",
                            en: "The Bot can be sent link to albums in Spotify, and it will create threads about the albums in the Discord server and adds the albums' data to the service's database",
                        },
                        {
                            fi: "Albumin metadata haetaan Spotify:n API:sta",
                            en: "Album metadata is fetched from Spotify's API",
                        },
                        {
                            fi: "Albumin threadissa voi antaa albumille pistearvion bottikomennoin",
                            en: "In the album thread in Discord one can give out review scores to the album using bot commands",
                        },
                        {
                            fi: "Levyraadin pistearviot näkyivät vanhalla kotisivullani",
                            en: "Aggregate review scores were displayed in my old website",
                        },
                    ],
                    tools: [
                        { fi: "Javascript, Node.js, REST-API:t", en: "Javascript, Node.js, REST API:s" },
                        { fi: "Tietokanta: MongoDB", en: "Database: MongoDB" },
                        { fi: "Hostaus: fly.io", en: "Hosting: fly.io" },
                    ],
                },
                // 9) Henkimaailma v1
                {
                    title: { fi: "Henkimaailma, ensimmäinen versio", en: "Personal homepage, first iteration" },
                    timeframe: { year: 2023, approximate: true },
                    descriptors: [
                        {
                            fi: "Ensimmäinen versio kotisivuistani, joita katselet juuri nyt",
                            en: "First iteration of my personal homepage that you're looking at right now",
                        },
                        {
                            fi: "Käytännössä alusta kokeilla JavaScriptiä käytännössä yliopiston web- ja mobiilisovelluskehityskurssin jälkeen",
                            en: "Basically a platform to try out Javascript and React in the wild, after tinkering with the concepts in university programming courses",
                        },
                        {
                            fi: "Kengännauhabudjetti: halpa hostaus ja infra",
                            en: "Dirt cheap infrastructure and hosting solutions",
                        },
                        {
                            fi: "Node.js backend jossa muutamia kevyitä toimintoja ja Jives-levyraatibotti",
                            en: "A Node.js backend that hosted some light backend functions and the music review service bot Jives",
                        },
                        {
                            fi: "Levyraadin tulokset synkronoituvat näkymään kotisivuillani",
                            en: "Review scores synced to display on my homepage]",
                        },
                    ],
                    tools: [
                        { fi: "Javascript, React, Node.js", en: "Javascript, React, Node.js" },
                        { fi: "Hostaus: Netlify, fly.io", en: "Hosting: Netlify, fly.io" },
                    ],
                },
                // 10) Gladiaattoripeli
                {
                    title: { fi: "Tekstipohjainen gladiaattoripeli", en: "Text-based gladiator game" },
                    timeframe: { year: 2019, approximate: true },
                    descriptors: [
                        {
                            fi: "Parityönä tehty Java-peli",
                            en: "A 2-man team short demo game",
                        },
                        {
                            fi: "Tekstipohjainen peli, jossa taistellaan gladiaattorilla, ostetaan varusteita ja kehitetään taistelijan kykyjä.",
                            en: "Text based UI and gameplay where you train a gladiator, buy equipment and try to survive as many rounds as possible",
                        },
                        {
                            fi: "Yliopiston Java-kurssin harjoitustyö",
                            en: "University Java course coursework",
                        },
                    ],
                    tools: [
                        { fi: "Java, Git", en: "Java, Git" },
                    ],
                },
                // 11) Doom modaus
                {
                    title: { fi: "Doom-modeja", en: "Doom modding" },
                    timeframe: { year: 2011, approximate: true },
                    descriptors: [
                        {
                            fi: "Skriptejä erilaisiin Doom-kenttien kohtauksiin",
                            en: "Scripts for various scenes in some custom Doom maps",
                        },
                        {
                            fi: "Skriptejä, jotka esim. tarkastavat pelaajan sijainnin pelitilassa ja aktivoivat tiettyjä toimintoja pelissä",
                            en: "Scripts e.g. checked player's location in game and activated various things based on game state",
                        },
                    ],
                    tools: [
                        { fi: "Zdoom, ZScript", en: "Zdoom, ZScript" },
                    ],
                },
            ],
        },
    ],
};