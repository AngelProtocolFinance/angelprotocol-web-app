import {
  updateSubgraphQueryData,
  useLazyProposalsQuery,
  useProposalsQuery,
} from "services/subgraph";
import Seo from "components/Seo";
import { useGetter, useSetter } from "store/accessors";
import { APP_NAME, DAPP_URL } from "constants/env";
import { adminRoutes } from "constants/routes";
import { useAdminContext } from "../Context";
import Table from "./Table";
import Toolbar from "./Toolbar";

export default function Proposals() {
  const { multisig, type, id } = useAdminContext();
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  const {
    data: { items, next } = { items: [], next: undefined },
    isFetching,
    isLoading,
    originalArgs,
  } = useProposalsQuery({
    multisigId: type === "charity" ? `${id}` : multisig,
    page: 1,
    status: activeStatus === "all" ? undefined : activeStatus,
  });

  const [loadMore] = useLazyProposalsQuery();

  async function more() {
    if (
      next &&
      originalArgs /** txs won't show if no initial query is made */
    ) {
      const { data: newPage } = await loadMore({
        ...originalArgs,
        page: next,
      });

      if (newPage) {
        //pessimistic update to original cache data
        dispatch(
          updateSubgraphQueryData("proposals", originalArgs, (prevResult) => {
            prevResult.items.push(...newPage.items);
            prevResult.next = newPage.next;
          })
        );
      }
    }
  }

  return (
    <div className="grid content-start rounded">
      <Seo
        title={`Decision Center - ${APP_NAME}`}
        url={`${DAPP_URL}/${adminRoutes.proposals}`}
      />

      <Toolbar classes="@xl:mb-6" />

      {(items.length > 0 && (
        <Table
          txs={items}
          more={isFetching ? "loading" : next ? more : undefined}
        />
      )) || (
        <p className="place-self-start">
          {isLoading ? "loading decisions.." : "no decisions found"}
        </p>
      )}
    </div>
  );
}
