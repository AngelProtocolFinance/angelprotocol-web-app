import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";

type Props = { endowId: number };
export default function EndowmentLink({ endowId }: Props) {
  const query = useEndowment({ id: endowId }, ["logo", "name"]);
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <Skeleton />,
        error: <_Link id={endowId} />,
      }}
    >
      {(endow) => <_Link {...endow} id={endowId} />}
    </QueryLoader>
  );
}

type LinkProps = {
  id: number;
  name?: string;
  logo?: string;
};
const _Link = (props: LinkProps) => (
  <Link
    to={appRoutes.admin + `/${props.id}`}
    className="hover:text-blue-d1 text-sm flex items-center gap-2"
  >
    <Image src={props.logo} className="object-cover h-[20px] w-[20px]" />
    <span>{props.name ?? `Endowment: ${props.id}`}</span>
  </Link>
);

function Skeleton() {
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
