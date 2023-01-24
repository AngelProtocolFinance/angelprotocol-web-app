import { PropsWithChildren } from "react";
import { WithdrawLog } from "types/aws";
import ExtLink from "components/ExtLink";
import { maskAddress } from "helpers";
import Amount from "../Amount";
import Status from "../Status";
import { explorerUrls } from "../constants";
import { getFinalRoute } from "../getFinalRoute";

export default function Log(props: WithdrawLog) {
  const { amount, symbol, target_wallet } = props;
  const finalRoute = getFinalRoute(props);
  return (
    <li className="grid gap-2 shadow-inner bg-white/10 p-3 rounded-md text-white/80">
      <KeyVal title="amount">
        <Amount val={amount} symbol={symbol} />
      </KeyVal>
      <KeyVal title="receiver">
        <span className="font-mono text-sm">{maskAddress(target_wallet)}</span>
      </KeyVal>

      <KeyVal title="status">
        <Status {...props} />
      </KeyVal>

      <KeyVal title="to receive">
        {finalRoute && finalRoute.status === "OK" ? (
          <Amount
            val={finalRoute.output_amount}
            symbol={finalRoute.output_symbol}
          />
        ) : (
          <>---</>
        )}
      </KeyVal>

      <KeyVal title="tx hash">
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
      </KeyVal>
    </li>
  );
}

function KeyVal({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="grid">
      <span className="text-xs">{title}</span>
      <div className="text-blue-l4">{children}</div>
    </div>
  );
}
