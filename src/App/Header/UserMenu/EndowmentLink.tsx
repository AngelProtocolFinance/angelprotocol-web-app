import { MenuItem } from "@headlessui/react";
import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import type { UserEndow } from "types/aws";

interface IBookmarkLink {
  endowId: number;
}
export function BookmarkLink({ endowId }: IBookmarkLink) {
  const query = useEndowment(endowId, ["logo", "name"]);
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <Skeleton />,
        error: <_Link id={endowId} route="profile" />,
      }}
    >
      {(endow) => <_Link {...endow} id={endowId} route="profile" />}
    </QueryLoader>
  );
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
    <Image src={props.logo} className="object-cover h-[20px] w-[20px]" />
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
