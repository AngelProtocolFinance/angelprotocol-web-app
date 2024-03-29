import dappLogo from "assets/images/bettergiving-logo.svg";
import { BASE_URL } from "constants/env";
import Image from "./Image";

export default function DappLogo({ classes = "" }) {
  return (
    <Image
      className={classes + " w-[200px]"}
      src={dappLogo}
      title="Go to Marketing page"
      href={BASE_URL}
    />
  );
}
