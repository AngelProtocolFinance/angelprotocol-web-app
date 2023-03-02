import { WithdrawLog } from "types/aws";
import { useChainsQuery } from "services/apes";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import QueryLoader from "components/QueryLoader";
import { Cells } from "components/TableSection";
import { humanize } from "helpers";
import Status from "../Status";
import { explorerUrls } from "../constants";
import { getFinalRoute } from "../getFinalRoute";

const hasMore = false;

export default function LogRow(props: WithdrawLog) {
  const { amount, target_wallet, start_time, target_chain, proposal_status } =
    props;
  const finalRoute = getFinalRoute(props);
  const queryState = useChainsQuery({});

  return (
    <Cells
      type="td"
      cellClass={`py-3 px-4 border-t border-prim max-w-[20rem] text-sm truncate ${
        hasMore ? "" : "first:rounded-bl last:rounded-br"
      }`}
    >
      <>{start_time ? new Date(start_time).toLocaleDateString() : <>---</>}</>

      <>{humanize(amount, 4)}</>

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading chain name...",
          error: "Error loading chain name",
        }}
      >
        {(chains) => (
          <span className="uppercase">
            {chains.find((chain) => chain.chain_id === target_chain)
              ?.chain_name ?? target_chain}
          </span>
        )}
      </QueryLoader>

      <span className="grid grid-cols-[1fr_auto] gap-2 items-center">
        <span className="max-w-[16rem] truncate">{target_wallet}</span>
        <Copier text={target_wallet} classes="w-6 h-6 hover:text-orange" />
      </span>

      {finalRoute && finalRoute.status === "OK" ? (
        <ExtLink
          className="text-orange hover:text-orange-l2 active:text-orange-d1 underline"
          href={`${explorerUrls[finalRoute.id]}/${finalRoute.hash}`}
        >
          View transactions
        </ExtLink>
      ) : (
        <>---</>
      )}

      <Status status={proposal_status} />
    </Cells>
  );
}
