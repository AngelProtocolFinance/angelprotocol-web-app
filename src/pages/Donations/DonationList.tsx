import { useEffect, useState, useMemo } from "react";
import { useDonationTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { EndowmentAddrProps, DonationItemProps } from "./types";
import useDonor from "./useDonor";
import Loader from "components/Loader/Loader";
import { DonationTransactions } from "services/aws/endowment_admin/types";
import useSortList, { Direction } from "./useSortList";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Icon from "components/Icons/Icons";

const keys: string[] = ["amount", "date", "endowment"];

const DonationList = (props: EndowmentAddrProps) => {
  const [isError, setIsError] = useState(false);
  const { data, isLoading } = useDonationTransactionsQuery(props.address);
  const {
    key: SortKey,
    direction,
    toggleDirection,
    sortList,
    setKey,
  } = useSortList<DonationTransactions>(["amount"]);

  useEffect(() => {
    if (data === undefined && !isLoading) {
      setIsError(true);
    }
  }, [data, isError, isLoading]);

  //TODO: sorting should be done on query transformReponse, or better on query
  //memoized this operation so not sorting on every render
  const renderedList = useMemo(() => sortList(data || []), [data, sortList]);
  return (
    <div className="col-span-2 flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10 overflow-auto max-h-75vh">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        <span>Donation History</span>
      </h3>
      {isError && <DonationItemError />}
      {isLoading && (
        <div className="my-20">
          <Loader
            bgColorClass="bg-light-grey bg-opacity-80"
            widthClass="w-4"
            gapClass="gap-4"
          />
        </div>
      )}
      {!isError && !isLoading && (
        <table className="mt-4 w-full">
          <thead>
            <tr className="text-md text-left font-heading uppercase text-md border-b-2 border-angel-blue border-opacity-20">
              {keys.map((key, i) => (
                <th
                  className="text-white text-sm text-left uppercase cursor-pointer pb-2"
                  key={i}
                  onClick={() =>
                    SortKey === key ? toggleDirection() : setKey(key)
                  }
                >
                  <span className="flex items-center justify-start gap-4">
                    {key}
                    {SortKey === key &&
                      (direction === Direction.Asc ? (
                        <Icon type="Up" />
                      ) : (
                        <Icon type="Down" />
                      ))}
                  </span>
                </th>
              ))}
              <th className="text-white text-sm text-left"></th>
              {/* <th className="text-white text-sm text-left"></th> */}
            </tr>
          </thead>
          <tbody>
            {renderedList?.map((item: DonationTransactions, i: number) => (
              <DonationItemInfo item={item} key={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const DonationItemInfo = (props: DonationItemProps) => {
  const wallet = useConnectedWallet();
  const data = props.item;
  const showDonor = useDonor(data.sort_key);
  const isDisabled = data.wallet_address !== wallet?.walletAddress;
  return (
    <tr className="hover:bg-angel-blue hover:bg-opacity-20 text-white bg-opacity-20 border-b-2 border-angel-blue border-opacity-20">
      <td className="py-5 pl-4">
        <p className="text-base font-bold">$ {toCurrency(data.amount)}</p>
      </td>
      <td>
        <span className="text-base">
          {data.transaction_date.substring(0, 10)}
        </span>
      </td>
      <td>
        <span className="text-base">{maskAddress(data.endowment_address)}</span>
      </td>
      <td>
        <button
          className="font-heading text-sm text-white-grey bg-blue-accent hover:bg-angel-blue border-2 border-opacity-30 shadow-sm w-32 uppercase text-center pt-1.5 pb-1 mb-1 lg:mb-0 rounded-md disabled:bg-gray-400 disabled:cursor-default"
          onClick={() => !isDisabled && showDonor()}
          disabled={isDisabled}
        >
          Update
        </button>
      </td>
    </tr>
  );
};

const DonationItemError = () => {
  return <p className="text-white">No donation records found.</p>;
};

export default DonationList;
