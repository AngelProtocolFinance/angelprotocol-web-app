import { useEffect, useState } from "react";
import { useDonationTransactionsQuery } from "services/aws/endowment_admin/endowment_admin";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import { EndowmentAddrProps, TransactionItemProps } from "./types";
import Action from "pages/Governance/Action";

const DonationList = (props: EndowmentAddrProps) => {
  const [isError, setIsError] = useState(false);
  const { data } = useDonationTransactionsQuery(props.address);
  useEffect(() => {
    if (data === undefined) {
      setIsError(true);
    }
  }, [data, isError]);

  return (
    <div className="col-span-2 flex flex-col bg-white bg-opacity-10 p-4 rounded-md shadow-md border border-opacity-10 overflow-auto max-h-75vh">
      <h3 className="text-lg font-bold uppercase flex items-center justify-start text-white">
        <span>Donation History</span>
      </h3>
      {isError && <DonationItemError />}
      {!isError && (
        <table className="mt-4 w-full">
          <thead>
            <tr className="text-md text-left font-heading uppercase text-md border-b-2 border-angel-blue border-opacity-20">
              <th className="text-white text-sm text-left pl-4">Amount/Type</th>
              <th className="text-white text-sm text-left">Date</th>
              <th className="text-white text-sm text-left">Endowment</th>
              <th className="text-white text-sm text-left"></th>
              <th className="text-white text-sm text-left"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <DonationItemInfo item={item} key={i} />
            ))}
          </tbody>
        </table>
      )}
      {/*<div className="w-full flex justify-end">
        <button className="action-button">Export as CSV</button>
      </div>*/}
    </div>
  );
};

const DonationItemInfo = (props: TransactionItemProps) => {
  const data = props.item;

  return (
    <tr className="hover:bg-angel-blue hover:bg-opacity-20 text-white bg-opacity-20 border-b-2 border-angel-blue border-opacity-20">
      <td className="py-2 pl-4">
        <p className="text-base font-bold">$ {toCurrency(data.amount)}</p>
        <p className="text-base capitalize">{data.transaction_type}</p>
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
        <Action title="Update" action={() => console.log("Update")} />
      </td>
      <td>
        <Action title="resend" action={() => console.log("resend")} />
      </td>
    </tr>
  );
};

const DonationItemError = () => {
  return <p className="text-white">No donation records found.</p>;
};

export default DonationList;
