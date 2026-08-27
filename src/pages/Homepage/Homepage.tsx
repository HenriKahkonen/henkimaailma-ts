import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./Homepage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';

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
          <p>{text.intro}</p>
          <p>{text.body}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Homepage;
