import { type Language, useLanguage } from "../../assets/LanguageContext.tsx"
import { type PortfolioField, static_content, formatTimeframe } from "./Portfoliopage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import React from "react"

function Portfoliopage() {
  const { language } = useLanguage();
  const text = static_content;
  const fields = static_content.fields

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
        </div>
      ))}
    
    </div>
  )
}

export default Portfoliopage;
