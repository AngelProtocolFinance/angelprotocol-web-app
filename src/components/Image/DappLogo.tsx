import dappLogo from "assets/images/angelgiving-H-logo-wht.svg";
import { BASE_URL } from "constant/env";
import Image from "./Image";

export default function DappLogo({ classes = "" }) {
  return (
    <Image
      className={classes}
      src={dappLogo}
      title="Go to Marketing page"
      href={BASE_URL}
    />
  );
}
