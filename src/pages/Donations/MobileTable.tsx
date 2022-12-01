import { Disclosure } from "@headlessui/react";
import type { FC } from "react";
import { Donation } from "types/aws";
import Icon, { DrawerIcon } from "components/Icon";
import useKYC from "components/KYC/useKYC";
import { useSort } from "components/donations";
import { humanize, maskAddress } from "helpers";

interface MobileTableProps {
  title: string;
  data: string | JSX.Element;
  className: string;
}

const MobileRow: FC<MobileTableProps> = ({ title, data, className }) => {
  return (
    <div
      className={`flex justify-between p-4 border-b border-gray-l2 dark:border-bluegray ${className}`}
    >
      <span className="font-bold uppercase">{title}</span>
      {typeof data === "string" ? <span className="">{data}</span> : data}
    </div>
  );
};

export default function MobileTable(props: { donations: Donation[] }) {
  const { sorted } = useSort(props.donations);
  const showKYCForm = useKYC();

  return (
    <div className="sm:hidden mt-6">
      <div className="grid items-center grid-cols-8 text-xs font-bold bg-orange-l6 dark:bg-blue-d7  border border-gray-l2 dark:border-bluegray">
        <div className="col-span-1 border-r border-gray-l2 dark:border-bluegray p-4 place-self-center">
          <Icon type="ArrowDown" size={24} className=" invisible" />
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
            id: charityId,
          },
          index
        ) => (
          <Disclosure as="div" className="flex flex-col">
            <>
              <Disclosure.Button>
                {({ open }) => (
                  <div
                    className={`grid grid-cols-8 sm:hidden ${
                      index % 2 === 0
                        ? "bg-white dark:bg-blue-d6"
                        : "bg-orange-l6 dark:bg-blue-d7"
                    }  ${
                      open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                    }  border-b border-x border-gray-l2 dark:border-bluegray`}
                  >
                    <div className="col-span-1 border-r border-gray-l2 dark:border-bluegray p-4 place-self-center">
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
                  <MobileRow
                    className="bg-white dark:bg-blue-d6"
                    title="Network"
                    data={`${chainName}`}
                  />
                  <MobileRow
                    className="bg-orange-l6 dark:bg-blue-d7"
                    title="Currency"
                    data={`${symbol}`}
                  />
                  <MobileRow
                    className="bg-white dark:bg-blue-d6"
                    title="Amount"
                    data={`${humanize(amount, 3)}`}
                  />
                  <MobileRow
                    className="bg-orange-l6 dark:bg-blue-d7"
                    title="TX Hash"
                    data={`${maskAddress(hash)}`}
                  />
                  <MobileRow
                    className="bg-white dark:bg-blue-d6"
                    title="Status"
                    data="Received"
                  />
                  <MobileRow
                    className="bg-orange-l6 dark:bg-blue-d7"
                    title="Receipt"
                    data={
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
                    }
                  />
                </div>
              </Disclosure.Panel>
            </>
          </Disclosure>
        )
      )}
    </div>
  );
}
