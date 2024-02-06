import dappLogo from "assets/images/bettergiving-logo-no-name-all-blue.svg";
import { BASE_URL } from "constants/env";
import Image, { DappLogo } from "components/Image";

const COMMON_CLASSES = "w-32 sm:w-48 h-12 sm:h-20";

export default function Logo() {
  return (
    <>
      <Image
        className={`${COMMON_CLASSES} max-sm:hidden lg:hidden`}
        src={dappLogo}
        title="Go to Marketing page"
        href={BASE_URL}
      />
      <DappLogo classes={`${COMMON_CLASSES} sm:hidden lg:block`} />
    </>
  );
}
