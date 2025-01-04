import { MenuItem } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import type { EndowmentBookmark, UserEndow } from "types/aws";
import ContentLoader from "../../ContentLoader";
import Image from "../../Image";

interface IBookmarkLink extends EndowmentBookmark {}
export function BookmarkLink({ endowId, ...endow }: IBookmarkLink) {
  return <_Link {...endow} id={endowId} route="profile" />;
}

export function EndowmentLink({ endowID, logo, name }: UserEndow) {
  return <_Link id={endowID} logo={logo} name={name} route="admin" />;
}

type LinkProps = {
  id: number;
  name?: string;
  logo?: string;
  route: "admin" | "profile";
};
const _Link = (props: LinkProps) => (
  <MenuItem
    as={Link}
    to={
      (props.route === "admin" ? appRoutes.admin : appRoutes.marketplace) +
      `/${props.id}`
    }
    className="hover:text-blue-d1 text-sm flex items-center gap-2"
  >
    <Image src={props.logo} className="object-cover" height={20} width={20} />
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
      <ContentLoader className="h-[20px] w-40 rounded" />
    </a>
  );
}
