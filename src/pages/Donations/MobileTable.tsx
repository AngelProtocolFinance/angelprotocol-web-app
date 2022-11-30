import { Disclosure } from "@headlessui/react";
import { Donation } from "types/aws";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import { useSort } from "components/donations";
import { humanize, maskAddress } from "helpers";

export default function MobileTable(props: { donations: Donation[] }) {
  const { sorted } = useSort(props.donations);
  const showKYCForm = useKYC();

  return (
    <div className="sm:hidden">
      <div className="grid grid-cols-8 bg-orange-l6 dark:bg-blue-d7 text-gray-d2 dark:text-white border border-gray-l2 dark:border-bluegray">
        <div className="col-span-1 border-r-[1px] border-gray-l2 dark:border-bluegray p-4 place-self-center">
          <Icon
            type="ArrowDown"
            size={24}
            className="text-gray-d2 dark:text-white invisible"
          />
        </div>
        <div className="col-span-4 border-r-[1px] border-gray-l2 dark:border-bluegray p-4 uppercase">
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
                      index % 2 === 0 ? "bg-white" : "bg-orange-l6"
                    } ${
                      index % 2 === 0 ? "dark:bg-blue-d6" : "dark:bg-blue-d7"
                    } text-gray-d2 dark:text-white border-b-[1px] border-x-[1px] border-gray-l2 dark:border-bluegray`}
                  >
                    <div className="col-span-1 border-r-[1px] border-gray-l2 dark:border-bluegray p-4 place-self-center">
                      <Icon
                        type={open ? "ArrowUp" : "ArrowDown"}
                        size={24}
                        className="text-gray-d2 dark:text-white"
                      />
                    </div>
                    <div className="col-span-4 border-r-[1px] border-gray-l2 dark:border-bluegray p-4 text-left">
                      <span className="truncate">{charityName}</span>
                    </div>
                    <div className="col-span-3 p-4 text-left">
                      {new Date(date).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="flex flex-col border-x-[1px] border-gray-l2 dark:border-bluegray">
                  <div className="flex justify-between dark:bg-blue-d7 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      Network
                    </span>
                    <span className="text-gray-d2 dark:text-white">
                      {chainName}
                    </span>
                  </div>
                  <div className="flex justify-between dark:bg-blue-d7 bg-orange-l6 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      Currency
                    </span>
                    <span className="text-gray-d2 dark:text-white">
                      {symbol}
                    </span>
                  </div>
                  <div className="flex justify-between dark:bg-blue-d7 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      Amount
                    </span>
                    <span className="text-gray-d2 dark:text-white">
                      {humanize(amount, 3)}
                    </span>
                  </div>
                  <div className="flex justify-between dark:bg-blue-d7  bg-orange-l6 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      TX Hash
                    </span>
                    <span className="text-gray-d2 dark:text-white">
                      {maskAddress(hash)}
                    </span>
                  </div>
                  <div className="flex justify-between dark:bg-blue-d7 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      Status
                    </span>
                    <button className="block bg-green text-white p-1 rounded uppercase text-xs">
                      Received
                    </button>
                  </div>
                  <div className="flex justify-between dark:bg-blue-d7  bg-orange-l6 p-4">
                    <span className="text-gray-d2 dark:text-white font-bold uppercase">
                      Receipt
                    </span>
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
                      <Icon
                        type="FatArrowDownload"
                        className="text-gray-d2 dark:text-white text-2xl"
                      />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          </Disclosure>
        )
      )}
    </div>
  );
}
const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
