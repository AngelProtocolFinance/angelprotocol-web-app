import dappLogoWhite from "assets/images/bettergiving-logo-white.png";
import dappLogo from "assets/images/bettergiving-logo.png";
import { appRoutes } from "constants/routes";
import Image from "./Image";

type Props = {
  classes?: string;
  color?: "blue" | "white";
};

export default function DappLogo({ classes = "", color = "blue" }: Props) {
  return (
    <Image
      className={classes}
      src={color === "blue" ? dappLogo : dappLogoWhite}
      title="Go to Home page"
      href={appRoutes.home}
    />
  );
}
