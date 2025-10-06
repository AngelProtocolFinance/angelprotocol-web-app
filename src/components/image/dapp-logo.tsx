import dappLogoWhite from "assets/images/logo-rectangle.svg";
import dappLogo from "assets/images/logo-rectangle.svg";
import { ExtLink } from "components/ext-link";
import { app_routes } from "constants/routes";
import { Link } from "react-router";
import { Image } from "./image";

type Props = {
  classes?: string;
  color?: "blue" | "white";
  to?: { href: string; title: string };
};

export function DappLogo({ classes = "", color = "blue", to }: Props) {
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
          <Link to={app_routes.home} title="Go to Home page">
            {img}
          </Link>
        )
      }
    />
  );
}
