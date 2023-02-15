import { Popover } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { WithdrawLog, WithdrawRoute } from "types/aws";
import ExtLink from "components/ExtLink";
import { humanize, maskAddress } from "helpers";
import { explorerUrls } from "./constants";

export default function Status({
  proposal_status,
  num_routes,
  routes = [],
}: WithdrawLog) {
  if (proposal_status === "rejected") {
    return <span className="text-red-l1 uppercase text-sm">rejected</span>;
  }

  const currRoute = routes.length;
  if (num_routes && currRoute > 0) {
    const status =
      currRoute >= num_routes && routes[currRoute - 1].status === "OK" ? (
        <span className="text-green-l1">completed</span>
      ) : (
        <span className="text-orange-l1">routing</span>
      );

    return (
      <Popover as="div" className="relative">
        <Popover.Button className="flex items-center gap-2 uppercase text-sm focus:outline-none">
          {({ open }) => (
            <>
              {status}
              <span
                className={`${
                  open ? "bg-blue/30" : "bg-white/10 hover:bg-white/20"
                } rounded-sm p-1 `}
              >
                {currRoute}/{num_routes}
              </span>
            </>
          )}
        </Popover.Button>
        <Popover.Panel
          as="ul"
          className="absolute bg-white shadow-md p-3 rounded-md text-gray-d2 z-10"
        >
          {Array(num_routes)
            .fill("")
            .map((_, i) => (
              <Route
                route={routes[i]}
                key={i}
                routeNum={i + 1}
                numRoutes={num_routes}
              />
            ))}
        </Popover.Panel>
      </Popover>
    );
  } else {
    return <span className="text-gray uppercase text-sm">submitted</span>;
  }
}

function Route(props: {
  route?: WithdrawRoute;
  numRoutes: number;
  routeNum: number;
}) {
  const progress = `${props.routeNum}/${props.numRoutes}`;
  if (!props.route) {
    return (
      <Container classes="flex items-center gap-1">
        <span>{progress}</span>
        <span>waiting</span>
      </Container>
    );
  }

  const { id, hash, status, output_amount, output_symbol } = props.route;
  return (
    <Container classes="grid gap-y-2">
      <div className="flex justify-between items-center">
        <span className="font-bold uppercase">{id}</span>
        <span className="text-xs">{progress}</span>
      </div>
      <span className="text-xs font-bold">{status}</span>
      <div className="flex gap-1 items-baseline">
        <span>{humanize(output_amount, 4)} </span>
        <span className="text-xs font-mono">{output_symbol}</span>
      </div>
      <ExtLink
        className="text-sm font-mono text-blue hover:text-blue-l1 active:text-blue-d1 mt-4"
        href={`${explorerUrls[id]}/${hash}`}
      >
        {maskAddress(hash)}
      </ExtLink>
    </Container>
  );
}

function Container(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <li
      {...props}
      className={`mt-2 first:mt-0 border-b last:border-none text-sm${
        props.classes ?? ""
      }`}
    />
  );
}
