import { WithdrawLog } from "types/aws";
import { Cells } from "components/TableSection";
import { humanize, maskAddress } from "helpers";
import Status from "./Status";
import { explorerUrls } from "./constants";

export default function LogRow(props: WithdrawLog) {
  const { amount, symbol, target_wallet, proposal_id } = props;
  const finalRoute = getFinalRoute(props);
  return (
    <Cells type="td" cellClass="p-2 text-zinc-50/80" key={proposal_id}>
      <div className="flex items-baseline gap-1">
        <span>{humanize(amount, 4)} </span>
        <span className="text-xs font-mono">{symbol}</span>
      </div>
      <span className="font-mono text-sm">{maskAddress(target_wallet)}</span>
      <Status {...props} />

      {finalRoute && finalRoute.status === "OK" ? (
        <div className="flex items-baseline gap-1">
          <span>{humanize(finalRoute.output_amount, 4)} </span>
          <span className="text-xs font-mono">{finalRoute.output_symbol}</span>
        </div>
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

function getFinalRoute({ routes = [], num_routes }: WithdrawLog) {
  const currRoute = routes.length;
  if (num_routes && currRoute > 0 && currRoute >= num_routes) {
    return routes[currRoute - 1];
  }
}
