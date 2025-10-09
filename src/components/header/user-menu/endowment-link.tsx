import { MenuItem } from "@headlessui/react";
import { Image } from "components/image";
import { NavLink, href } from "react-router";
import type { INpoBookmark, IUserNpo2 } from "types/user";
import { ContentLoader } from "../../content-loader";

interface IBookmarkLink extends INpoBookmark {}
export function BookmarkLink({ id, ...endow }: IBookmarkLink) {
  return (
    <_Link
      {...endow}
      id={id}
      to={href("/marketplace/:id", { id: id.toString() })}
    />
  );
}

export function EndowmentLink({ id, logo, name }: IUserNpo2) {
  return (
    <_Link
      id={id}
      logo={logo}
      name={name}
      to={href("/admin/:id", { id: id.toString() })}
    />
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
