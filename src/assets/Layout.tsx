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
                    <div className="navlinks">
                        <NavBarLink link="/" linkText={{fi:"Etusivu",en:"Home"}} />
                    </div>
                    <LangSelectLinks />
                </nav>
            </div>

            <div className="page-chunk">
                <main className="page-content">
                    <Outlet />
                </main>
            </div>

            <div className="page-chunk">
                <footer className="site-footer">
                    <span>TODO: create footer</span>{/* TODO import footer */}
                </footer>
            </div>

        </div>
    );
}


interface NavBarLinkProps {
    link: string;
    linkText: Record<Language, string>;
}

/** 
Function displays a navigation link in the navbar. Active link should appear underscored. Link text changes based on language context.

@param link - The target link
@param linkText - Link texts based on language.

Usage:

<NavBarLink link="/" linkText={{fi: "Etusivu", en: "Home"}} />
*/
function NavBarLink( { link, linkText }: NavBarLinkProps ) {
    const { language } = useLanguage();
    return (
        <div className="NavBarLink">
            <NavLink 
                to={link}
                className={({isActive, isPending}) => 
                    isActive ? "active" : isPending ? "pending" : ""
                }
            >
                <span>{linkText[language]}</span>
            </NavLink>
        </div>
    );
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
    );
}

export default Layout