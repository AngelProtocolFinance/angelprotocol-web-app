import { Disclosure } from "@headlessui/react";
import { PropsWithChildren } from "react";
import { TableProps } from "./types";
import Icon, { DrawerIcon } from "components/Icon";
import useKYC from "components/KYC/useKYC";
import useSort from "hooks/useSort";
import { humanize, maskAddress } from "helpers";

export default function MobileTable({ donations, classes = "" }: TableProps) {
  const { sorted } = useSort(donations);
  const showKYCForm = useKYC();

  return (
    <div className={`${classes} border border-prim rounded`}>
      <div className="grid items-center grid-cols-[auto_1fr_auto] h-12 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded">
        <div className="w-12" />
        <div className="p-4">Recipient</div>
        <div className="p-4 w-28 text-center">Date</div>
      </div>

      <div className="text-sm">
        {sorted.map((row, index) => (
          <Disclosure
            key={index}
            as="div"
            className="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 w-full border-b border-prim"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`${
                    open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                  } w-full h-12 grid grid-cols-[auto_1fr_auto] border-b last:border-0 border-prim divide-x divide-prim`}
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
                  <Row title="TX Hash">{maskAddress(row.hash)}</Row>
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
                  <Row title="Receipt">
                    <button
                      className="block"
                      onClick={() =>
                        showKYCForm({
                          type: "post-donation",
                          txHash: row.hash,
                          classes: "grid gap-5",
                        })
                      }
                    >
                      <Icon type="FatArrowDownload" className="text-2xl" />
                    </button>
                  </Row>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
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
      {children}
    </div>
  );
}
