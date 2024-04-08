import { Disclosure } from "@headlessui/react";
import Icon, { DrawerIcon } from "components/Icon";
import { humanize } from "helpers";
import useSort from "hooks/useSort";
import { PropsWithChildren } from "react";
import LoadMoreBtn from "./LoadMoreBtn";
import { TableProps } from "./types";
import useShowKYCForm from "./useShowKYCForm";

export default function MobileTable({
  donations,
  classes = "",
  disabled,
  isLoading,
  hasMore,
  status,
  onLoadMore,
}: TableProps) {
  const { sorted } = useSort(donations, "date");
  const showKYCForm = useShowKYCForm();

  return (
    <div
      className={`${classes} border border-blue-l2 ${
        hasMore ? "rounded-t" : "rounded"
      }`}
    >
      <div className="grid items-center grid-cols-[auto_1fr_auto] h-12 uppercase text-xs font-bold bg-blue-l5 dark:bg-blue-d7 border-b border-blue-l2 divide-x divide-blue-l2 rounded-t">
        <div className="w-12" />
        <div className="p-4">Recipient</div>
        <div className="p-4 w-28 text-center">Date</div>
      </div>

      {sorted.map((row, index) => (
        <Disclosure
          key={index}
          as="div"
          className={`text-sm odd:bg-blue-l5 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-blue-l2 ${
            hasMore ? "" : "last:rounded-b"
          }`}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`${
                  open ? "bg-blue-l5 dark:bg-blue-d4" : ""
                } w-full grid grid-cols-[auto_1fr_auto] divide-x divide-blue-l2`}
              >
                <DrawerIcon
                  size={24}
                  className={`${
                    open ? "text-blue-d1" : ""
                  } w-12 place-self-center`}
                  isOpen={open}
                />
                <p className="text-sm p-4 text-left h-full truncate">
                  {row.recipientName}
                </p>
                <div className="p-4 text-center text-sm w-28">
                  {new Date(row.date).toLocaleDateString()}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="w-full divide-y divide-blue-l2">
                <Row title="Network">{row.viaName}</Row>
                <Row title="Currency">{row.symbol}</Row>
                <Row title="Amount">{humanize(row.initAmount, 3)}</Row>
                <Row title="USD Value">
                  {row.initAmountUsd
                    ? `$${humanize(row.initAmountUsd, 2)}`
                    : "--"}
                </Row>
                <Row title="TX Hash">{row.id}</Row>
                {status === "final" && (
                  <Row title="Receipt" className="rounded-b">
                    <button
                      className="block"
                      onClick={() => showKYCForm(row.id)}
                    >
                      <Icon type="FatArrowDownload" className="text-2xl" />
                    </button>
                  </Row>
                )}
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
      className={`flex justify-between p-4 odd:bg-white even:bg-blue-l5 dark:bg-blue-d7 ${className}`}
    >
      <span className="font-bold uppercase">{title}</span>
      <span className="truncate max-w-[167px]">{children}</span>
    </div>
  );
}
