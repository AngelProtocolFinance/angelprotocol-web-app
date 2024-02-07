import Loader from "components/Loader";
import Seo from "components/Seo";
import { Suspense, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CHARITY_LINKS } from "./constants";
import useHandleScreenResize, { SCREEN_SM } from "hooks/useHandleScreenResize";
import { useGetter } from "store/accessors";

const {
  HEADER_LINKS,
  HEADER_LINKS_WITH_AUTH,
  GROUPS_DATA,
  SOCIAL_MEDIA_LINKS,
} = CHARITY_LINKS;

export default function Layout() {
  const user = useGetter((state) => state.auth.user);
  const isMobileRef = useRef(false);
  const [isMobile, setMobile] = useState(isMobileRef.current);

  useHandleScreenResize(
    (screenSize) => {
      const _isMobile = screenSize < SCREEN_SM;
      if (_isMobile !== isMobileRef.current) {
        setMobile(_isMobile);
        isMobileRef.current = _isMobile;
      }
    },
    {
      shouldAttachListener: true,
      shouldCallOnResizeOnLoad: true,
      debounceTime: 50,
    }
  );

  const navLinks = isMobile && !user ? HEADER_LINKS_WITH_AUTH : HEADER_LINKS;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gray">
      <Seo /> {/* Load all defaults for SEO meta tags */}
      <Header classes="top-0 sticky z-20" links={navLinks} />
      <Suspense fallback={<LoaderComponent />}>
        <Outlet />
      </Suspense>
      <Footer linkGroups={GROUPS_DATA} socials={SOCIAL_MEDIA_LINKS} />
    </div>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);
