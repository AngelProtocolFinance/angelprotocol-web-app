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
  onLoadMore,
}: TableProps) {
  const { sorted } = useSort(donations, "date");
  const showKYCForm = useShowKYCForm();

  return (
    <div
      className={`${classes} border border-prim ${
        hasMore ? "rounded-t" : "rounded"
      }`}
    >
      <div className="grid items-center grid-cols-[auto_1fr_auto] h-12 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded-t">
        <div className="w-12" />
        <div className="p-4">Recipient</div>
        <div className="p-4 w-28 text-center">Date</div>
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
                  open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                } w-full grid grid-cols-[auto_1fr_auto] divide-x divide-prim`}
              >
                <DrawerIcon
                  size={24}
                  className={`${
                    open ? "text-orange" : ""
                  } w-12 place-self-center`}
                  isOpen={open}
                />
                <p className="text-sm p-4 text-left h-full truncate">
                  {row.charityName}
                </p>
                <div className="p-4 text-center text-sm w-28">
                  {new Date(row.date).toLocaleDateString()}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="w-full font-work divide-y divide-prim">
                <Row title="Network">{row.chainName}</Row>
                <Row title="Currency">{row.symbol}</Row>
                <Row title="Amount">{humanize(row.amount, 3)}</Row>
                <Row title="USD Value">{`$${humanize(row.usdValue, 2)}`}</Row>
                <Row title="TX Hash">{row.hash}</Row>
                <Row title="Status">
                  <div
                    className={`${
                      row.donationFinalized
                        ? "bg-green"
                        : "bg-gray-d1 dark:bg-gray"
                    } font-body text-white px-2 py-0.5 rounded`}
                  >
                    {row.donationFinalized ? "RECEIVED" : "PENDING"}
                  </div>
                </Row>
                <Row title="Receipt" className="rounded-b">
                  <button
                    className="block"
                    onClick={() => showKYCForm(row.hash)}
                  >
                    <Icon type="FatArrowDownload" className="text-2xl" />
                  </button>
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
      className={`flex justify-between p-4 odd:bg-white even:bg-orange-l6 dark:bg-blue-d7 ${className}`}
    >
      <span className="font-bold uppercase">{title}</span>
      <span className="truncate max-w-[167px]">{children}</span>
    </div>
  );
}
