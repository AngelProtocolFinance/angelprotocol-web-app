import { Link } from "@remix-run/react";
import dappLogoWhite from "assets/images/bettergiving-logo-white.webp";
import dappLogo from "assets/images/bg-logo-503c.webp";
import ExtLink from "components/ExtLink";
import { appRoutes } from "constants/routes";
import Image from "./Image";

type Props = {
  classes?: string;
  color?: "blue" | "white";
  to?: { href: string; title: string };
};

export default function DappLogo({ classes = "", color = "blue", to }: Props) {
  return (
    <Image
      className={classes}
      src={color === "blue" ? dappLogo : dappLogoWhite}
      render={(img) =>
        to ? (
          <ExtLink href={to.href} title={to.title}>
            {img}
          </ExtLink>
        ) : (
          <Link to={appRoutes.home} title="Go to Home page">
            {img}
          </Link>
        )
      }
    />
  );
}
