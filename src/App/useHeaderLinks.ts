import useHandleScreenResize, {
  SCREEN_WIDTHS,
} from "hooks/useHandleScreenResize";
import { useRef, useState } from "react";
import { useGetter } from "store/accessors";
import { CHARITY_LINKS } from "./constants";

const { HEADER_LINKS, HEADER_LINKS_WITH_AUTH } = CHARITY_LINKS;

export default function useHeaderLinks() {
  const user = useGetter((state) => state.auth.user);
  const isMobileRef = useRef(false);
  const [isMobile, setMobile] = useState(isMobileRef.current);

  useHandleScreenResize(
    (screenSize) => {
      const _isMobile = screenSize < SCREEN_WIDTHS.sm;
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

  return isMobile && !user ? HEADER_LINKS_WITH_AUTH : HEADER_LINKS;
}
