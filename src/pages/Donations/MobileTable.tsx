import { Disclosure } from "@headlessui/react";
import React, { PropsWithChildren } from "react";
import { TableProps } from "./types";
import Icon, { DrawerIcon } from "components/Icon";
import useKYC from "components/KYC/useKYC";
import useSort from "hooks/useSort";
import { humanize, maskAddress } from "helpers";

export default function MobileTable({ donations, classes = "" }: TableProps) {
  const { sorted } = useSort(donations);
  const showKYCForm = useKYC();

  return (
    <div
      className={`${classes} border border-gray-l2 dark:border-bluegray rounded`}
    >
      <div className="grid items-center grid-cols-8 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-gray-l2 dark:border-bluegray divide-x divide-gray-l2 dark:divide-bluegray rounded">
        <div />
        <div className="col-start-2 col-span-4 p-4">Recipient</div>
        <div className="col-span-3 p-4">Date</div>
      </div>

      <div className="grid grid-cols-8 text-sm">
        {sorted.map((row, index) => (
          <Disclosure key={index} as={React.Fragment}>
            <Disclosure.Button className="col-span-full grid w-fulljy grid-cols-8">
              {({ open }) => (
                <div
                  className={`${
                    open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                  } border-b border-gray-l2 dark:border-bluegray divide-x divide-gray-l2 dark:divide-bluegray`}
                >
                  <div className="col-span-1 w-full flex justify-center border-r border-gray-l2 dark:border-bluegray p-4">
                    <DrawerIcon
                      size={24}
                      className={`${open ? "text-orange" : ""}`}
                      isOpen={open}
                    />
                  </div>
                  <div className="col-span-4 border-r border-gray-l2 dark:border-bluegray p-4 text-left">
                    <p className="text-sm">{row.charityName}</p>
                  </div>
                  <div className="col-span-3 p-4 text-left text-sm">
                    {new Date(row.date).toLocaleDateString()}
                  </div>
                </div>
              )}
            </Disclosure.Button>
            <Disclosure.Panel>
              <Row classes="font-work" title="Network">
                {row.chainName}
              </Row>
              <Row title="Currency">{row.symbol}</Row>
              <Row title="Amount">{humanize(row.amount, 3)}</Row>
              <Row title="USD Value">{`$${humanize(row.usdValue, 2)}`}</Row>
              <Row title="TX Hash">{maskAddress(row.hash)}</Row>
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

interface RowProps {
  title: string;
  classes?: string;
}

function Row({ title, children, classes }: PropsWithChildren<RowProps>) {
  return (
    <div
      className={`flex justify-between p-4 border-b border-gray-l2 dark:border-bluegray ${classes}`}
    >
      <span className="font-bold uppercase">{title}</span>
      {children}
    </div>
  );
}
