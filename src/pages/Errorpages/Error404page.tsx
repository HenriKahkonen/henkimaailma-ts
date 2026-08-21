import { useLocation } from "react-router-dom"
import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./Error404page.content.ts"

function Error404page() {
  const { language } = useLanguage();
  const location = useLocation(); /* Page user is in */
  const text = content[language];

  return (
    <div className="errorpage">
      <h1>{text.heading}</h1>
      <p>{text.intro}</p>
      <p>{text.body(location.pathname)}</p>
    </div>
  );
}

export default Error404page;
