import { memo } from "react";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

function Footer() {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
    </>
  );
}

export default memo(Footer);
