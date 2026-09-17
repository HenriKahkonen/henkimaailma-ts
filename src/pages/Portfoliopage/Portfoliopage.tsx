import { type Language, useLanguage } from "../../assets/LanguageContext.tsx"
import { type PortfolioField, static_content, formatTimeframe, type PortfolioProject } from "./Portfoliopage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import React, { useEffect } from "react"
import { trackPageView } from "../../assets/trackPageView.tsx";

function Portfoliopage() {
  const { language } = useLanguage();
  const text = static_content;
  const fields = static_content.fields

  useEffect(() => {
      trackPageView({content_type:"genericpage",slug:"portfolio-page"})
    }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        transition={{ duration: 0.4, ease: 'easeInOut'}}
      >

        <div className="portfoliopage">
          <h1>Portfolio</h1>
          <p>{text.intro[language]}</p>
          <br/>
          {fields.map ((field) => (
            <React.Fragment key = {"Portfoliofield-"+field.fieldname.fi}>
                {renderPortfolioField(field,language)}
            </React.Fragment>

          ))}

        </div>

      </motion.div>
    </AnimatePresence>
  );
}

function renderPortfolioField(field:PortfolioField, lang:Language) {
  const projects  = field.projects

  /*const desctext = {
    fi: "Kuvaus:",
    en: "Description:"
  }*/
  const toolstext = {
    fi: "Työkalut:",
    en: "Tools:",
  }

  return (
    <div className="portfolio-field">
      <h2>{field.fieldname[lang]}</h2>
      {projects.map ((project) => (
        <div className="portfolio-item" key={"Project"+project.title.fi}>
          <b>{project.title[lang]}</b>, <span>{formatTimeframe(project.timeframe, lang)}</span>
          {/*<p>{desctext[lang]}</p>*/}

          <ul>
            {project.descriptors.map ((desc) => (
              <li key={project.title.fi+desc.fi}>{desc[lang]}</li>
            ))}
          </ul>

          <p>{toolstext[lang]}</p>
          <ul>
            {project.tools.map ((tool) => (
              <li key={project.title.fi+tool.fi}>{tool[lang]}</li>
            ))}
          </ul>

          {/* "Links" <p> not rendered if project has no links */}
          {renderPortfolioProjectLinks({lang,project})}

        </div>
      ))}
    
    </div>
  )
}


interface PortfolioLinkProps {
  lang : Language;
  project: PortfolioProject
}

function renderPortfolioProjectLinks ({ lang, project }:PortfolioLinkProps) {
  const linktxt = static_content.links_text[lang]
  if (project.links === undefined) {
    return null
  }
  else {
    return (
      <>
        <p>{linktxt}</p>
        <ul>
          {project.links.map ((link) => (
              <li key={link.url}>
                <a href={link.url}>
                  {link.name[lang] ? link.name[lang] : link.name.all}
                </a>
              </li>
          ))}
        </ul>
      </>
    )
  }
}

export default Portfoliopage;
