import { useLanguage } from "../../assets/LanguageContext.tsx"
import { content } from "./Homepage.content.ts"

function Homepage() {
  const { language } = useLanguage();
  const text = content[language];

  return (
    <div className="homepage">
      <h1>{text.heading}</h1>
      <p>{text.intro}</p>
      <p>{text.body}</p>
    </div>
  );
}

export default Homepage;
