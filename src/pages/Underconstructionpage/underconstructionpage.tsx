import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./underconstructionpage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import ReactMarkdown from "react-markdown";

interface underconstructionpageProps {
  heading: string;
}

function Underconstructionpage({heading}: underconstructionpageProps) {
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

          <h1>{heading}</h1>
          <ReactMarkdown>{text.underconstruction}</ReactMarkdown>

      </motion.div>
    </AnimatePresence>
  );
}

export default Underconstructionpage;
