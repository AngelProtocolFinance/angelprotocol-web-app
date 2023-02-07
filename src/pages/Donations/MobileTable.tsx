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
      <div className="grid items-center grid-cols-8 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded">
        <div />
        <div className="col-start-2 col-span-4 p-4">Recipient</div>
        <div className="col-span-3 p-4">Date</div>
      </div>

      <div className="col-span-full text-sm">
        {sorted.map((row, index) => (
          <Disclosure
            key={index}
            as="div"
            className="even:bg-orange-l6 dark:even:bg-blue-d7 w-full border-b border-prim"
          >
            <Disclosure.Button className="w-full grid grid-cols-8 border-b last:border-0 border-prim divide-x divide-prim">
              {({ open }) => (
                <>
                  <DrawerIcon
                    size={25.5}
                    className={`${open ? "text-orange" : ""} place-self-center`}
                    isOpen={open}
                  />
                  <p className="text-sm col-span-4 p-4 text-left h-full">
                    {row.charityName}
                  </p>
                  <div className="col-span-3 p-4 text-left text-sm">
                    {new Date(row.date).toLocaleDateString()}
                  </div>
                </>
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="w-full font-work">
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
                      : "even:bg-gray-d1 dark:even:bg-gray"
                  } text-white px-2 py-0.5 rounded`}
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
                  <Icon type="FatArrowDownload" className=" text-2xl" />
                </button>
              </Row>
            </Disclosure.Panel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

function Row({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex justify-between p-4">
      <span className="font-bold uppercase">{title}</span>
      {children}
    </div>
  );
}
