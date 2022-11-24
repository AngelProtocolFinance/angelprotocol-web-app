import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Donation } from "types/aws";
import CsvExporter from "components/CsvExporter";
import Icon from "components/Icon";
import useKYC from "components/KYC/useKYC";
import TableSection, { Cells } from "components/TableSection";
import { HeaderButton, useSort } from "components/donations";
import { getTxUrl, humanize, maskAddress } from "helpers";
import { appRoutes } from "constants/routes";

export default function Table(props: { donations: Donation[] }) {
  const { handleHeaderClick, sorted, sortDirection, sortKey } = useSort(
    props.donations
  );
  const showKYCForm = useKYC();

  return (
    <>
      {/* {Desktop} */}
      <table className="w-full text-sm text-gray-d2 hidden sm:table">
        <TableSection type="thead" rowClass="">
          <Cells
            type="th"
            cellClass="bg-orange-l6 uppercase font-heading font-semibold text-left text-gray-d2 text-sm border border-gray-l2 p-3"
          >
            <HeaderButton
              onClick={handleHeaderClick("charityName")}
              _activeSortKey={sortKey}
              _sortKey="charityName"
              _sortDirection={sortDirection}
            >
              Recipient
            </HeaderButton>
            <HeaderButton
              onClick={handleHeaderClick("date")}
              _activeSortKey={sortKey}
              _sortKey="date"
              _sortDirection={sortDirection}
            >
              Date
            </HeaderButton>
            <HeaderButton
              onClick={handleHeaderClick("chainName")}
              _activeSortKey={sortKey}
              _sortKey="chainName"
              _sortDirection={sortDirection}
            >
              Network
            </HeaderButton>
            <>Currency</>
            <HeaderButton
              onClick={handleHeaderClick("amount")}
              _activeSortKey={sortKey}
              _sortKey="amount"
              _sortDirection={sortDirection}
            >
              Amount
            </HeaderButton>
            <>TX Hash</>
            <span className="flex justify-center">Status</span>
            <CsvExporter
              classes="hover:text-blue justify-center"
              headers={csvHeaders}
              data={props.donations}
              filename="donations.csv"
            >
              Receipt
            </CsvExporter>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="hover:bg-blue hover:bg-blue/10 border border-gray-l2 even:bg-orange-l6"
        >
          {sorted.map(
            ({
              hash,
              amount,
              symbol,
              chainId,
              date,
              chainName,
              charityName,
              id: charityId,
            }) => (
              <Cells key={hash} type="td" cellClass="p-3 border border-gray-l2">
                <Link
                  to={`${appRoutes.profile}/${charityId}`}
                  className="flex items-center gap-1 w-40 cursor-pointer text-sm hover:underline"
                >
                  <span className="truncate">{charityName}</span>
                  <Icon type="ExternalLink" className="w-5 h-5" />
                </Link>
                <>{new Date(date).toLocaleDateString()}</>
                <>{chainName}</>
                <span className="font-mono text-sm">{symbol}</span>
                <>{humanize(amount, 3)}</>
                <a
                  href={getTxUrl(chainId, hash)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-center text-angel-blue cursor-pointer uppercase text-sm"
                >
                  {maskAddress(hash)}
                </a>
                <button className="block mx-auto bg-green text-white p-1 rounded uppercase text-xs">
                  Received
                </button>
                <button
                  className="w-full flex justify-center"
                  onClick={() =>
                    showKYCForm({
                      type: "post-donation",
                      txHash: hash,
                      classes: "grid gap-5",
                    })
                  }
                >
                  <Icon type="FatArrowDownload" className="text-2xl" />
                </button>
              </Cells>
            )
          )}
        </TableSection>
      </table>

      {/* {Mobile} */}
      <div>
        <div className="grid grid-cols-8 sm:hidden bg-orange-l6 text-gray-d2 border border-gray-l2">
          <div className="col-span-1 border-r-[1px] border-gray-l2 p-4 place-self-center">
            <Icon
              type="ArrowDown"
              size={24}
              className="text-gray-d2 invisible"
            ></Icon>
          </div>
          <div className="col-span-4 border-r-[1px] border-gray-l2 p-4">
            Recipient
          </div>
          <div className="col-span-3 p-4">Date</div>
        </div>

        {sorted.map(
          ({
            hash,
            amount,
            symbol,
            chainId,
            date,
            chainName,
            charityName,
            id: charityId,
          }) => (
            <div className="flex flex-col">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="even:bg-orange-l6">
                      <div className="grid grid-cols-8 sm:hidden bg-orange-l6 text-gray-d2 border-b-[1px] border-x-[1px] border-gray-l2">
                        <div className="col-span-1 border-r-[1px] border-gray-l2 p-4 place-self-center">
                          <Icon
                            type={open ? "ArrowUp" : "ArrowDown"}
                            size={24}
                            className="text-gray-d2"
                          ></Icon>
                        </div>
                        <div className="col-span-4 border-r-[1px] border-gray-l2 p-4 text-left">
                          <span className="truncate">{charityName}</span>
                        </div>
                        <div className="col-span-3 p-4 text-left">
                          {new Date(date).toLocaleDateString()}
                        </div>
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      <div className="flex flex-col even:bg-orange-l6 border-x-[1px] border-gray-l2">
                        <div className="flex justify-between p-4 border-b-[1px] border-gray-l2">
                          <span className="text-gray-d2 font-bold uppercase">
                            Network
                          </span>
                          <span className="text-gray-d2">{chainName}</span>
                        </div>
                        <div className="flex justify-between p-4 border-b-[1px] border-gray-l2">
                          <span className="text-gray-d2 font-bold uppercase">
                            Currency
                          </span>
                          <span className="text-gray-d2">{symbol}</span>
                        </div>
                        <div className="flex justify-between p-4 border-b-[1px] border-gray-l2">
                          <span className="text-gray-d2 font-bold uppercase">
                            Amount
                          </span>
                          <span className="text-gray-d2">
                            {humanize(amount, 3)}
                          </span>
                        </div>
                        <div className="flex justify-between p-4 border-b-[1px] border-gray-l2">
                          <span className="text-gray-d2 font-bold uppercase">
                            TX Hash
                          </span>
                          <span className="text-gray-d2">
                            {maskAddress(hash)}
                          </span>
                        </div>
                        <div className="flex justify-between p-4 border-b-[1px] border-gray-l2">
                          <span className="text-gray-d2 font-bold uppercase">
                            Status
                          </span>
                          <button className="block bg-green text-white p-1 rounded uppercase text-xs">
                            Received
                          </button>
                        </div>
                        <div className="flex justify-between p-4">
                          <span className="text-gray-d2 font-bold uppercase">
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
                              className="text-gray-d2 text-2xl"
                            />
                          </button>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          )
        )}
      </div>
    </>
  );
}
const csvHeaders: { key: keyof Donation; label: string }[] = [
  { key: "amount", label: "Amount" },
  { key: "symbol", label: "Currency" },
  { key: "date", label: "Date" },
  { key: "hash", label: "Transaction Hash" },
];
