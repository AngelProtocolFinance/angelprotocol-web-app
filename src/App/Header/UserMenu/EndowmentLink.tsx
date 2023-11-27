import { Link } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constant/routes";

type Props = { endowId: number };
export default function EndowmentLink({ endowId }: Props) {
  const query = useProfileQuery({ endowId });
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: <Skeleton />,
        error: <></>,
      }}
    >
      {({ name, logo }) => (
        <Link
          to={appRoutes.admin + `/${endowId}`}
          className="hover:text-orange text-sm flex items-center gap-2"
        >
          <Image src={logo} height={20} width={20} className="object-cover" />
          <span>{name}</span>
        </Link>
      )}
    </QueryLoader>
  );
}

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
