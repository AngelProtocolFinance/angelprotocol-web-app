import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import type { UserEndow } from "types/aws";

interface IEndowmentLink extends UserEndow {
  route: "admin" | "profile";
}
export default function EndowmentLink({
  endowID,
  logo,
  name,
  route,
}: IEndowmentLink) {
  return <_Link id={endowID} logo={logo} name={name} route={route} />;
}

type LinkProps = {
  id: number;
  name?: string;
  logo?: string;
  route: IEndowmentLink["route"];
};
const _Link = (props: LinkProps) => (
  <Link
    to={
      (props.route === "admin" ? appRoutes.admin : appRoutes.marketplace) +
      `/${props.id}`
    }
    className="hover:text-blue-d1 text-sm flex items-center gap-2"
  >
    <Image src={props.logo} className="object-cover h-[20px] w-[20px]" />
    <span>{props.name ?? `Endowment: ${props.id}`}</span>
  </Link>
);
