import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" />
      <Views />
      <Footer />
    </div>
  );
}
