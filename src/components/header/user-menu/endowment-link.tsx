import { MenuItem } from "@headlessui/react";
import { Image } from "components/image";
import { app_routes } from "constants/routes";
import { NavLink } from "react-router";
import type { INpoBookmark, IUserNpo2 } from "types/user";
import { ContentLoader } from "../../content-loader";

interface IBookmarkLink extends INpoBookmark {}
export function BookmarkLink({ id, ...endow }: IBookmarkLink) {
  return <_Link {...endow} id={id} to={`${app_routes.marketplace}/${id}`} />;
}

export function EndowmentLink({ id, logo, name }: IUserNpo2) {
  return (
    <_Link id={id} logo={logo} name={name} to={`${app_routes.admin}/${id}`} />
  );
}

type LinkProps = {
  id: number | string;
  name?: string;
  logo?: string;
  to: string;
};
const _Link = (props: LinkProps) => (
  <MenuItem
    as={NavLink}
    to={props.to}
    className="hover:text-blue-d1 text-sm flex items-center gap-2"
  >
    <Image
      loading="lazy"
      src={props.logo}
      className="object-cover"
      height={20}
      width={20}
    />
    <span>{props.name ?? `Endowment: ${props.id}`}</span>
  </MenuItem>
);

export function Skeleton() {
  return (
    <a
      href={"/"}
      className="flex items-center gap-1 pointer-events-none"
      aria-disabled={true}
    >
      <ContentLoader className="w-[20px] h-[20px] rounded-full" />
      <ContentLoader className="h-[20px] w-40 rounded-sm" />
    </a>
  );
}
