import { WithdrawLog } from "types/aws";
import { useChainsQuery } from "services/apes";
import ExtLink from "components/ExtLink";
import QueryLoader from "components/QueryLoader";
import { Cells } from "components/TableSection";
import { maskAddress } from "helpers";
import Amount from "../Amount";
import Status from "../Status";
import { explorerUrls } from "../constants";
import { getFinalRoute } from "../getFinalRoute";

const hasMore = false;

export default function LogRow(props: WithdrawLog) {
  const { amount, symbol, target_wallet, start_time, target_chain } = props;
  const finalRoute = getFinalRoute(props);
  const queryState = useChainsQuery({});

  return (
    <Cells
      type="td"
      cellClass={`p-3 border-t border-prim max-w-[256px] truncate ${
        hasMore ? "" : "first:rounded-bl last:rounded-br"
      }`}
    >
      <>{start_time ? new Date(start_time).toLocaleDateString() : <>---</>}</>

      <Amount val={amount} symbol={symbol} />

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

      <span className="font-mono text-sm">{maskAddress(target_wallet)}</span>

      {finalRoute && finalRoute.status === "OK" ? (
        <ExtLink
          className="text-sm font-mono text-blue hover:text-blue-l1 active:text-blue-d1"
          href={`${explorerUrls[finalRoute.id]}/${finalRoute.hash}`}
        >
          {maskAddress(finalRoute.hash)}
        </ExtLink>
      ) : (
        <>---</>
      )}

      <Status {...props} />
    </Cells>
  );
}
