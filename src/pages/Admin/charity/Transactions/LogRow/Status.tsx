import { Popover } from "@headlessui/react";
import { WithdrawLog, WithdrawRoute } from "types/server/aws";
import { humanize, maskAddress } from "helpers";
import { explorerUrls } from "./constants";

export default function Status({
  proposal_status,
  num_routes,
  routes = [],
}: WithdrawLog) {
  if (proposal_status === "rejected") {
    return <span className="text-rose-400 uppercase text-sm">rejected</span>;
  }

  const currRoute = routes.length;
  if (num_routes && currRoute > 0) {
    let status =
      currRoute >= num_routes && routes[currRoute - 1].status === "OK" ? (
        <span className="text-emerald-400">completed</span>
      ) : (
        <span className="text-amber-400">routing</span>
      );

    return (
      <Popover as="div" className="relative">
        <Popover.Button className="flex items-center gap-2 uppercase text-sm focus:outline-none">
          {status}
          <span className="bg-zinc-50/10 rounded-sm p-1 hover:bg-zinc-50/20">
            {currRoute}/{num_routes}
          </span>
        </Popover.Button>
        <Popover.Panel
          as="ul"
          className="absolute bg-zinc-50 shadow-md p-3 rounded-md text-zinc-600 z-10"
        >
          {Array(num_routes)
            .fill("")
            .map((_, i) => (
              <Route route={routes[i]} key={i} />
            ))}
        </Popover.Panel>
      </Popover>
    );
  } else {
    return <span className="text-zinc-400 uppercase text-sm">submitted</span>;
  }
}

function Route(props: { route?: WithdrawRoute }) {
  if (!props.route) {
    return <>processing</>;
  }

  const { id, hash, status, output_amount, output_symbol } = props.route;
  return (
    <li className="mt-2 first:mt-0 border-b last:border-none text-sm grid gap-y-1">
      <div className="flex justify-between items-center">
        <span className="font-bold uppercase">{id}</span>
        <span className="text-xs font-bold">{status}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{humanize(output_amount, 4)} </span>
        <span className="text-xs">{output_symbol}</span>
      </div>
      <a
        className="font-mono text-sky-500 hover:text-sky-400 active:text-sky-600"
        href={`${explorerUrls[id]}/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {maskAddress(hash)}
      </a>
    </li>
  );
}
