import { Disclosure } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { WithdrawLog } from "types/aws";
import { useChainsQuery } from "services/apes";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { humanize } from "helpers";
import Actions from "../Actions";
import Status from "../Status";
import { explorerUrls } from "../constants";
import { getFinalRoute } from "../getFinalRoute";

type Props = { log: WithdrawLog; isLastBotBorderFlat: boolean };

export default function TableRow({ log, isLastBotBorderFlat }: Props) {
  return (
    <Disclosure
      as="div"
      className={`text-sm odd:bg-orange-l6 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-prim ${
        isLastBotBorderFlat ? "" : "last:rounded-b"
      }`}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`${
              open ? "bg-orange-l5 dark:bg-blue-d4 border-b border-prim" : ""
            } w-full grid grid-cols-6 divide-x divide-prim`}
          >
            <DrawerIcon
              size={24}
              className={`${open ? "text-orange" : ""} w-12 place-self-center`}
              isOpen={open}
            />
            <span className="text-sm py-3 px-4 col-span-3 text-left">
              {new Date(log.start_time).toLocaleDateString()}
            </span>
            <span className="py-3 px-4 text-sm col-span-2 text-left">
              {humanize(log.amount, 4)}
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full font-work divide-y divide-prim">
            <Row title="Network">
              <Network chainId={log.target_chain} />
            </Row>
            <Row title="Withdrawal address/account">
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <span className="truncate">{log.target_wallet}</span>
                <Copier
                  text={log.target_wallet}
                  classes="w-6 h-6 hover:text-orange"
                />
              </div>
            </Row>
            <Row title="Blockhain record">
              <ViewTransactions {...log} />
            </Row>
            <Row title="Status">
              <Status status={log.proposal_status} />
            </Row>
            <Row title="Actions" className="rounded-b">
              <Actions proposalId={log.proposal_id} />
            </Row>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function Row({
  className = "",
  title,
  children,
}: PropsWithChildren<{ className?: string; title: string }>) {
  return (
    <div
      className={`grid grid-cols-2 items-center odd:bg-white even:bg-orange-l6 dark:bg-blue-d7 ${className}`}
    >
      <span className="py-3 px-4 font-bold uppercase text-xs">{title}</span>
      <span className="py-3 px-4 truncate max-w-[167px] justify-self-end">
        {children}
      </span>
    </div>
  );
}

function Network({ chainId }: { chainId: string }) {
  const queryState = useChainsQuery({});
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading chain name...",
        error: "Error loading chain name",
      }}
    >
      {(chains) => (
        <span className="uppercase">
          {chains.find((chain) => chain.chain_id === chainId)?.chain_name ??
            chainId}
        </span>
      )}
    </QueryLoader>
  );
}

function ViewTransactions(props: WithdrawLog) {
  const finalRoute = getFinalRoute(props);

  if (!finalRoute || finalRoute.status !== "OK") {
    return <>---</>;
  }

  return (
    <ExtLink
      className="text-orange hover:text-orange-l2 active:text-orange-d1 underline"
      href={`${explorerUrls[finalRoute.id]}/${finalRoute.hash}`}
    >
      View transactions
    </ExtLink>
  );
}
