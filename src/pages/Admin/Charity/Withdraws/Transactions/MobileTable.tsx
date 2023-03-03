import { Disclosure } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { TableProps } from "./types";
import { WithdrawLog } from "types/aws";
import { useChainsQuery } from "services/apes";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";
import useSort from "hooks/useSort";
import { humanize } from "helpers";
import Actions from "./Actions";
import LoadMoreBtn from "./LoadMoreBtn";
import Status from "./Status";
import { explorerUrls } from "./constants";
import { getFinalRoute } from "./getFinalRoute";

export default function MobileTable({
  withdraws,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  onLoadMore,
}: TableProps) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    withdraws,
    "start_time"
  );

  return (
    <div
      className={`${classes} w-full max-md:max-w-lg border border-prim ${
        hasMore ? "rounded-t" : "rounded"
      }`}
    >
      <div className="grid items-center grid-cols-6 h-10 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded-t">
        <div />
        <div className="py-3 px-4 col-span-3">Start time</div>
        <div className="py-3 px-4 col-span-2 text-center">Amount</div>
      </div>

      {sorted.map((row, index) => (
        <Disclosure
          key={index}
          as="div"
          className={`text-sm odd:bg-orange-l6 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-prim ${
            hasMore ? "" : "last:rounded-b"
          }`}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open
                    ? "bg-orange-l5 dark:bg-blue-d4 border-b border-prim"
                    : ""
                } w-full grid grid-cols-6 divide-x divide-prim`}
              >
                <DrawerIcon
                  size={24}
                  className={`${
                    open ? "text-orange" : ""
                  } w-12 place-self-center`}
                  isOpen={open}
                />
                <span className="text-sm py-3 px-4 col-span-3 text-left">
                  {new Date(row.start_time).toLocaleDateString()}
                </span>
                <span className="py-3 px-4 text-sm col-span-2 text-left">
                  {humanize(row.amount, 4)}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="w-full font-work divide-y divide-prim">
                <Row title="Network">
                  <Network chainId={row.target_chain} />
                </Row>
                <Row title="Withdrawal address/account">
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="truncate">{row.target_wallet}</span>
                    <Copier
                      text={row.target_wallet}
                      classes="w-6 h-6 hover:text-orange"
                    />
                  </div>
                </Row>
                <Row title="Blockhain record">
                  <ViewTransactions {...row} />
                </Row>
                <Row title="Status">
                  <Status status={row.proposal_status} />
                </Row>
                <Row title="Actions" className="rounded-b">
                  <Actions proposalId={row.proposal_id} />
                </Row>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      {hasMore && (
        <LoadMoreBtn
          onLoadMore={onLoadMore}
          disabled={disabled}
          isLoading={isLoading}
        />
      )}
    </div>
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
