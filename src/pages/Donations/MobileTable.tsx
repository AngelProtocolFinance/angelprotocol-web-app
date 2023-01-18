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
            <Disclosure.Button className="col-span-full grid grid-cols-8 border-b last:border-0 border-gray-l2 dark:border-bluegray divide-x divide-gray-l2 dark:divide-bluegray even:bg-orange-l6 dark:even:bg-blue-d7">
              {({ open }) => (
                <>
                  <DrawerIcon
                    size={25.5}
                    className={`${open ? "text-orange" : ""} place-self-center`}
                    isOpen={open}
                  />
                  <p className="text-sm col-span-4 p-4 text-left">
                    {row.charityName}
                  </p>
                  <div className="col-span-3 p-4 text-left text-sm">
                    {new Date(row.date).toLocaleDateString()}
                  </div>
                </>
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="col-span-full font-work group">
              <Row title="Network">{row.chainName}</Row>
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
      className={`flex col-span-full justify-between p-4 border-b border-gray-l2 dark:border-bluegray ${classes} group-even:odd:bg-orange-l6 dark:group-even:odd:bg-blue-d7 group-odd:even:bg-orange-l6 dark:group-odd:even:bg-blue-d7`}
    >
      <span className="font-bold uppercase">{title}</span>
      {children}
    </div>
  );
}
