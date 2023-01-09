import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="sticky top-0 z-20" />
      <Views />
      <Footer />
    </div>
  );
}
