import { Disclosure } from "@headlessui/react";
import type { FC } from "react";
import { Donation } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import useKYC from "components/KYC/useKYC";
import { useSort } from "components/donations";
import { humanize, maskAddress } from "helpers";

export default function MobileTable(props: { donations: Donation[] }) {
  const { sorted } = useSort(props.donations);
  const showKYCForm = useKYC();

  return (
    <div className="lg:hidden">
      <div className="grid items-center grid-cols-8 text-xs font-bold bg-orange-l6 dark:bg-blue-d7  border border-gray-l2 dark:border-bluegray">
        <div className="col-span-1 w-full flex justify-center border-r border-gray-l2 dark:border-bluegray p-4">
          <Icon type="ArrowDown" size={24} className="invisible" />
        </div>
        <div className="col-span-4 border-r border-gray-l2 dark:border-bluegray p-4 uppercase">
          Recipient
        </div>
        <div className="col-span-3 p-4 uppercase">Date</div>
      </div>

      {sorted.map(
        (
          {
            hash,
            amount,
            symbol,
            chainId,
            date,
            chainName,
            charityName,
            usdValue,
            id: charityId,
          },
          index
        ) => (
          <Disclosure as="div" className="flex flex-col">
            <>
              <Disclosure.Button>
                {({ open }) => (
                  <div
                    className={`grid grid-cols-8 lg:hidden ${
                      index % 2 === 0
                        ? "bg-white dark:bg-blue-d6"
                        : "bg-orange-l6 dark:bg-blue-d7"
                    }  ${
                      open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                    }  border-b border-x border-gray-l2 dark:border-bluegray`}
                  >
                    <div className="col-span-1 w-full flex justify-center border-r border-gray-l2 dark:border-bluegray p-4">
                      <DrawerIcon
                        size={24}
                        className={`${open ? "text-orange" : ""}`}
                        isOpen={open}
                      />
                    </div>
                    <div className="col-span-4 border-r border-gray-l2 dark:border-bluegray p-4 text-left">
                      <span className="truncate text-sm">{charityName}</span>
                    </div>
                    <div className="col-span-3 p-4 text-left text-sm">
                      {new Date(date).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="flex flex-col border-x border-gray-l2 dark:border-bluegray">
                  <Row
                    className="bg-white dark:bg-blue-d6 font-work"
                    title="Network"
                  >
                    {chainName}
                  </Row>
                  <Row
                    className="bg-orange-l6 dark:bg-blue-d7 font-body"
                    title="Currency"
                  >
                    {symbol}
                  </Row>
                  <Row className="bg-white dark:bg-blue-d6" title="Amount">
                    {humanize(amount, 3)}
                  </Row>
                  <Row className="bg-white dark:bg-blue-d6" title="USD Value">
                    {`$${humanize(usdValue, 2)}`}
                  </Row>
                  <Row className="bg-orange-l6 dark:bg-blue-d7" title="TX Hash">
                    {maskAddress(hash)}
                  </Row>
                  <Row className="bg-orange-l6 dark:bg-blue-d7" title="Receipt">
                    <button
                      className="block"
                      onClick={() =>
                        showKYCForm({
                          type: "post-donation",
                          txHash: hash,
                          classes: "grid gap-5",
                        })
                      }
                    >
                      <Icon type="FatArrowDownload" className=" text-2xl" />
                    </button>
                  </Row>
                </div>
              </Disclosure.Panel>
            </>
          </Disclosure>
        )
      )}
    </div>
  );
}

interface MobileTableProps {
  title: string;
  children: string | JSX.Element;
  className: string;
}

const Row: FC<MobileTableProps> = ({ title, children, className }) => {
  return (
    <div
      className={`flex justify-between p-4 border-b border-gray-l2 dark:border-bluegray ${className}`}
    >
      <span className="font-bold uppercase">{title}</span>
      {children}
    </div>
  );
};
