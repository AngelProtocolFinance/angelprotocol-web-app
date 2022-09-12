import { WithdrawLog } from "types/aws";
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
    <Cells type="td" cellClass="p-2 text-zinc-50/80">
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
        <a
          className="text-sm font-mono text-sky-500 hover:text-sky-400 active:text-sky-600"
          href={`${explorerUrls[finalRoute.id]}/${finalRoute.hash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {maskAddress(finalRoute.hash)}
        </a>
      ) : (
        <>---</>
      )}
    </Cells>
  );
}
