import { useLocation } from "react-router-dom"
import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./Error404page.content.ts"
import {motion, AnimatePresence} from 'framer-motion';


function Error404page() {
  const { language } = useLanguage();
  const location = useLocation(); /* Page user is in */
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
          <div className="errorpage">
            <h1>{text.heading}</h1>
            <p>{text.intro}</p>
            <p>{text.body(location.pathname)}</p>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}

export default Error404page;
