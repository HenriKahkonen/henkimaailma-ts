import { NavLink, Outlet } from 'react-router-dom'
import { type Language, useLanguage } from './LanguageContext';
import fiFlag from '../assets/svg/fi.svg';
import gbFlag from '../assets/svg/gb.svg';

/* Layout wrapper for pages */

function Layout() {

    return (
        <div className="page-wrapper">
            <div className="page-chunk">
                <nav className="site-nav">
                    <div className="nav-header">
                        <h2>Henkimaailma</h2>
                        <LangSelectLinks />
                    </div>
                    <div className="navlinks">
                        <NavBarLink link="/" linkText={{fi:"Etusivu",en:"Home"}} />
                        {/*<NavBarLink linklang={{fi:"/sivukartta",en:"/sitemap"}} linkText={{fi:"Sivukartta",en:"Site map"}} />*/}
                        <NavBarLink link="/portfolio" linkText={{fi:"Portfolio",en:"Portfolio"}}/>
                        <NavBarLink linklang={{fi:"/arviot",en:"/reviews"}} linkText={{fi:"Arviot",en:"Reviews"}}/>
                        <NavBarLink linklang={{fi:"/tekstit",en:"/articles"}} linkText={{fi:"Tekstit",en:"Articles"}}/>
                        <NavBarLink linklang={{fi:"/musiikki",en:"/music"}} linkText={{fi:"Musiikki",en:"Music"}}/>
                        <NavBarLink link="/sns" linkText={{fi:"Ääniefektit",en:"Sound effects"}}/>
                        <NavBarLink linklang={{fi:"/muuta",en:"/other"}} linkText={{fi:"Kaikkea muuta",en:"Other stuff"}}/>
                        <NavBarLink link="/blog" linkText={{fi:"Blogi",en:"Blog"}}/>
                        <NavBarLink link="/meta" linkText={{fi:"Meta",en:"Meta"}}/>
                    </div>
                </nav>
            </div>

            <div className="page-chunk">
                <main className="page-content">
                    <Outlet />
                </main>
                <div className="site-footer">
                    <span>© Henri Kähkönen 2026</span>
                </div>
            </div>

        </div>
    );
}


type NavBarLinkProps = 
  | {
      link: string;
      linklang?: never;
      linkText: Record<Language, string>;
    }
  | {
      link?: never;
      linklang: Record<Language, string>;
      linkText: Record<Language, string>;
    };


/** 
Function displays a navigation link in the navbar. Active link should appear underscored. Link text changes based on language context.

@param link - The target link
@param linkText - Link texts based on language.

Usage (pick one):

<NavBarLink link="/" linkText={fi: "Etusivu", en: "Home"} />

OR

<NavBarLink linklang={fi:"/etusivu",en:"/home"}"/" linkText={fi: "Etusivu", en: "Home"} />
*/
function NavBarLink( { link, linklang, linkText }: NavBarLinkProps ) {
    const { language } = useLanguage();
    const linktarget = link ?? linklang[language]
    /*If not linklang */
    return (
        <div className="NavBarLink">
            <NavLink 
                to={linktarget} 
                className={({isActive, isPending}) => 
                    isActive ? "active" : isPending ? "pending" : ""
                }
            >
                <span>{linkText[language]}</span>
            </NavLink>
        </div>
    );
    /* if linklank point to different places depending on lang context */
}




interface LangOption {
    langCode : Language;
    label: string;
    flag: string;
}

const LANG_OPTIONS: LangOption[] = [
    { langCode: "fi", label: "Suomi", flag: fiFlag},
    { langCode: "en", label: "English", flag: gbFlag},   
]

const LANG_PROMPT_TEXT: Record<Language, string> = {
    fi: "Valitse kieli:",
    en: "Choose language:",
}

/**
Element that displays the language select options.

Displays text to choose language in context-appropriate language and svg flags that can be clicked to change the language.
*/
function LangSelectLinks() {
    const { language, setLanguage } = useLanguage();
    return (
        <div className="lang-select">
            <span className="lang-select-prompt">{LANG_PROMPT_TEXT[language]}</span>
            <div className="lang-select-buttons">
                {LANG_OPTIONS.map((langOption) => (
                    <button
                        key={langOption.langCode}
                        type="button"
                        className={langOption.langCode === language ? "lang-flag active" : "lang-flag"}
                        disabled={langOption.langCode === language}
                        onClick={() => setLanguage(langOption.langCode)}
                        aria-label={langOption.label}
                    >
                        <img src={langOption.flag} alt={langOption.label} />
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Layout