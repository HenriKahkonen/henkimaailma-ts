import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./otherstuffpage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import ReactMarkdown from "react-markdown";

function Otherstuffpage() {
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

          <h1>{text.heading}</h1>
          <ReactMarkdown>{text.intro}</ReactMarkdown>

      </motion.div>
    </AnimatePresence>
  );
}

export default Otherstuffpage;
