import { WithdrawLog } from "types/aws";
import ExtLink from "components/ExtLink";
import { Cells } from "components/TableSection";
import { maskAddress } from "helpers";
import Amount from "../Amount";
import Status from "../Status";
import { explorerUrls } from "../constants";
import { getFinalRoute } from "../getFinalRoute";

export default function LogRow(props: WithdrawLog) {
  const { amount, symbol, target_wallet } = props;
  const finalRoute = getFinalRoute(props);
  return (
    <Cells type="td" cellClass="p-2 text-white/80">
      <Amount val={amount} symbol={symbol} />

      <span className="font-mono text-sm">{maskAddress(target_wallet)}</span>
      <Status {...props} />

      {finalRoute && finalRoute.status === "OK" ? (
        <Amount
          val={finalRoute.output_amount}
          symbol={finalRoute.output_symbol}
        />
      ) : (
        <>---</>
      )}
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
    </Cells>
  );
}
