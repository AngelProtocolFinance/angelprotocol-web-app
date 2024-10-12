import { Info } from "components/Status";
import { useNavigation, useSearchParams } from "react-router-dom";
import type { EndowListPaginatedAWSQueryRes, EndowmentCard } from "types/aws";
import Card from "./Card";

interface Props {
  classes?: string;
  page: EndowListPaginatedAWSQueryRes<EndowmentCard[]>;
}

export default function Cards({ classes = "", page }: Props) {
  const navigation = useNavigation();
  const [params, setParams] = useSearchParams();
  const { Items: endowments, NumOfPages, Page } = page;

  const hasMore = Page < NumOfPages;

  if (endowments.length === 0) {
    return <Info>No organisations found</Info>;
  }

  return (
    <div
      className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
    >
      {endowments.map((endow) => (
        <Card {...endow} key={endow.id} />
      ))}

      {hasMore && (
        <button
          type="button"
          disabled={navigation.state === "loading"}
          className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
          onClick={() => {
            const n = new URLSearchParams(params);
            n.set("page", String(Page + 1));
            setParams(n, { replace: true, preventScrollReset: true });
          }}
        >
          Load more organizations
        </button>
      )}
    </div>
  );
}
