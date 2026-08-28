import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./Homepage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import ReactMarkdown from "react-markdown";

function Homepage() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        transition={{ duration: 0.4, ease: 'easeInOut'}}
      >
        <div className="homepage">

          <h1>{text.heading}</h1>
          <ReactMarkdown>{text.intro}</ReactMarkdown>
          <ReactMarkdown>{text.par1}</ReactMarkdown>
          <ReactMarkdown>{text.par2}</ReactMarkdown>
          <ReactMarkdown>{text.finalPar}</ReactMarkdown>
          <div className="language-warning"><ReactMarkdown>{text.langWarning}</ReactMarkdown></div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Homepage;
