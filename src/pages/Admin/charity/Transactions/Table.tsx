import { Popover } from "@headlessui/react";
import { WithdrawLog, WithdrawRoute } from "types/server/aws";
import TableSection, { Cells } from "components/TableSection";
import { humanize, maskAddress } from "helpers";

export default function TransactionsTable(props: { withdraws: WithdrawLog[] }) {
  return (
    <table className="col-span-2">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="">
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {props.withdraws.map((log) => {
          const finalRoute = getFinalRoute(log);
          return (
            <Cells type="td" cellClass="" key={log.proposal_id}>
              <span className="flex items-center">
                {humanize(log.amount, 4)} {log.symbol}
              </span>
              <>{maskAddress(log.target_wallet)}</>
              <Status {...log} />
              <>
                {finalRoute
                  ? `${finalRoute.output_amount} ${finalRoute.output_symbol}`
                  : "---"}
              </>
              <>{finalRoute ? maskAddress(finalRoute.hash) : "---"}</>
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}

function getFinalRoute({ routes = [], num_routes }: WithdrawLog) {
  const currRoute = routes.length;
  if (num_routes && currRoute > 0 && currRoute >= num_routes) {
    return routes[currRoute - 1];
  }
}

function Status({ proposal_status, num_routes, routes = [] }: WithdrawLog) {
  if (proposal_status === "rejected") {
    return <span className="text-rose-400">rejected</span>;
  }

  const currRoute = routes.length;
  if (num_routes && currRoute > 0) {
    let status =
      currRoute >= num_routes && routes[currRoute - 1].status === "OK"
        ? "completed"
        : "routing";

    return (
      <Popover>
        <Popover.Button>
          {status} {currRoute}/{num_routes}
        </Popover.Button>
        <Popover.Panel as="ul">
          {Array(num_routes)
            .fill("")
            .map((_, i) => (
              <Route route={routes[i]} key={i} />
            ))}
        </Popover.Panel>
      </Popover>
    );
  } else {
    return <>posted</>;
  }
}

function Route(props: { route?: WithdrawRoute }) {
  if (!props.route) {
    return <>processing</>;
  }

  const { id, hash, status, output_amount, output_symbol } = props.route;
  return (
    <div>
      <p>{id}</p>
      <p>{status}</p>
      <p>
        {humanize(output_amount, 4)} {output_symbol}
      </p>
      <p>{maskAddress(hash)}</p>
    </div>
  );
}
