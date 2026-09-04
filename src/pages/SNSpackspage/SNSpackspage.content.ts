import { type Language } from "../../assets/LanguageContext"

interface CC_BY_SA_Svg {
    icon : string;
    name : string;
}

export interface CC_BY_SA_Author {
    author : string;
    icons : CC_BY_SA_Svg[];
}

export interface LicenceInfo {
    abbreviation : string;
    name: string;
    description: Record<Language, string>;
    info_link?: string;
}

export interface FAQItem {
    q : string;
    a : string;
}

interface SnSPageContent {
    sns_heading: string,
    sns_body: string;
    faq_heading: string;
    faq: FAQItem[]
    loading: string;
    licences_heading: string;
    updated: string;
    licence: string;
    show_file_list: string;
    download: string;
}

export const licences: LicenceInfo[] = [
    { abbreviation: "CC0",
      name: "CC0 Public Domain Dedication",
      description: {
        fi: "Täysin vapaasti käytettävä, tekijänoikeusvapaa materiaali. Voit käyttää miten tahansa, kunhan et väitä tehneesi käyttämääsi CC0-materiaalia itse (ks. tekijän moraalinen oikeus).",
        en: "Fully free to use, public domain material. Only restriction is that you may not claim you made the CC0 licenced material yourself (see: moral right of author)."
      },
      info_link: "https://creativecommons.org/public-domain/"
    }
]

export const content: Record<Language, SnSPageContent> = {
    fi: {
        sns_heading: "Sounds and Scapes -samplepackit",
        sns_body: "SnS -samplepäkit ovat jatkuva projektini, jossa pyrin tuottamaan erilaisia helposti saavutettavia ja mahdollisimman sallivalla lisenssillä julkaistua äänimateriaalia, jota muut tekijät voivat käyttää projekteissaan, kuten vaikkapa äänisuunnittelussa, musiikissa tai peleissä. Suurin osa tiedostoista ja muusta materiaalista on julkaistu CC0 -lisenssillä.\n\nUskon, että mediatuotannon kentän hyvinvointi ja vapaa kilpailu edellyttää mahdollisimman paljon julkisesti saatavilla olevaa, ilmaista audiovisuaalista materiaalia. SnS -samplepäkit ovat minun kontribuutioni public domainiin - ne ovat muovailuvahaa, jota saa vapaasti muotoilla omiin tuotoksiinsa murehtimasta materiaalin tekijänoikeuksista.",
        faq_heading: "Usein kysyttyä",
        faq: [
            {
                q: "Saanko käyttää tätä <Biisissäni, pelissäni, videossani...>?",
                a: "Kyllä. Tämä materiaali on käytettäväksi tarkoitettu. Tarkista käyttämäsi paketin lisenssi yksityiskohtien selvittämiseksi."
            },
            {
                q: "Mikä on CC0-lisenssi?",
                a: "CC0 on \"[Creative commons, zero rights reserved](https://creativecommons.org/public-domain/)\" -lisenssi. Tietoa kaikista SnS-pakettien käyttämistä lisensseistä on tietopaketti tämän osion alla."
            },
            {
                q: "Olet hieno muusikko, haluan kreditoida sinua kappaleessani. Kuka olet?",
                a: "En itse ole soittanut valtaosaa raidoista, joissa soittotaitoja ylistetään :( \n\n Sounds and Scapes 3 -paketin instrumenttiraidat ovat soittaneet: Rummut **Janne Alakiuttu**, Kosketinsoittimet **Aleksi Tiikkala**, Saksofoni **Sanna Yliniva**, Käyrätorvi **Tatu Palo**. Paketin 4 rummut on soittanut **Vilho Talvela**.\n\nOlen itse vain nauhoittanut kyseiset instrumentit. Kaikki SnS-paketeissa esiintyvät soittajat ovat suostuneet äänitteiden luovuttamiseen vapaaseen käyttöön CC0-lisenssillä, eli ketään äänitteiden tekijöistä _ei tarvitse_ kreditoida, muttei se ole kiellettyäkään.\n\n Äänityksen, äänen käsittelyn ja soittamisen kaikilla muilla nauhoilla on suorittanut allekirjoittanut, **Henri Kähkönen**."
            },
            {
                q: "Mikä on tekijän 'moraalinen oikeus'?",
                a: "Koska SnS-paketit ovat julkaistu Suomessa, ovat ne Suomen tekijänoikeuslain alaisia myös siinä mielessä, miten Suomen laki tulkitsee tekijänoikeuksien raukeamista ja 'public domainia' (käsite, jota suomalaisessa tekijänoikeuskäytännössä ei ole samalla tavalla kuin amerikkalaisessa vastaavassa. \n\nMoraalisella oikeudella tarkoitetaan tekijän oikeutta tulla tunnustetuksi teoksensa tekijänä, ja tämä oikeus säilyy ikuisuuteen myös varsinaisen teoksen levitysoikeuksien raukeamisen jälkeen. Käytännössä tämä tarkoittaa esimerkiksi CC0-lisenssin tapauksessa sitä, että *vaikka voit jättää kertomatta, mistä käyttämäsi CC0 -sample on peräisin, et voi lain mukaan väittää tehneesi sitä itse*, sillä se loukkaisi ääniraidan tekijöiden oikeutta tulla tunnustetuksi teoksen tekijöinä."
            },
        ],
        loading: "Ladataan SnS -dataa...",
        licences_heading: "Käytetyistä lisensseistä",
        updated: "Päivitetty",
        licence: "Lisenssi",
        show_file_list: "Näytä tiedostolistaus",
        download: "Lataa tästä",

    },
    en: {
        sns_heading: "Sounds and Scapes -sample packs",
        sns_body: "SnS samplepacks are an ongoing project of mine where I aim to produce different types easily accessible sound material published under as permitting a licence as possible. You may use any of these files in your own projects, be it sound design, music, game audio or whatever else. Most of the files and other material listed here are distributed under the Creative Commons CC0 licence.\n\nI believe that fair competition in and the well-being of the media production field requires as much publicly available, free audiovisual material as possible. The SnS samplepacks are intended to be my contributions to the public domain - clay free to be molded into things of your own without the need to worry about copyright infringement.",
        faq_heading: "Frequently asked questions",
        faq: [
            {
                q: "Can I use this in my <Track, Game, Video...>?",
                a: "Yes. The stuff is designed to be used. Check the licence of the pack you're using for more information."
            },
            {
                q: "What is the CC0 licence?",
                a: "CC0 is the \"[Creative commons, zero rights reserved](https://creativecommons.org/public-domain/)\" -licence. You'll find a more detailed info packet about all of the licences used by the SnS sample packs below."
            },
            {
                q: "You're an amazing musician and I want to credit you in my track. Who are you?",
                a: "In reality I haven't played myself most of the samples receiving this praise :(\n\nSounds and Scapes 3 -packs instrument credits are as following: Drums **Janne Alakiuttu**, Keyboards **Aleksi Tiikkala**, Sax **Sanna Yliniva**, French Horn **Tatu Palo**. Pack 4 drums are performed by  **Vilho Talvela**.\n\n I've myself merely recorded the samples in these packs.All of the performers heard in SnS packs have agreed to publish the tracks into the public domain under the CC0 licence, so it's not _mandatory_ to credit anyone when using those packs, but it's not disallowed either. Recording, editing ja musical performances on all other packs is done by yours truly, **Henri Kähkönen**."
            },
            {
                q: "What is the 'moral' right in copyright?",
                a: "Being published in Finland, all of the material in this page is still beholdent to the way copyright and public domain is interpreted under the Finnish copyright law. \n\n In Finland the author retains forever a right to be identified as the source and author of a work even if the rights to distribute and make copies of a work are not reserved. In the case of CC0 licencing, *you may omit the information about where the CC0 licenced sample you used originated from, but you may not claim you created the sample yourself* as that would violate the sound author's right to be recognized as the creators of their work."
            },
        ],
        loading: "Loading SnS sample pack data...",
        licences_heading: "About the licences used",
        updated: "Updated",
        licence: "Licence",
        show_file_list: "Show file list",
        download: "Download here",
    },
};