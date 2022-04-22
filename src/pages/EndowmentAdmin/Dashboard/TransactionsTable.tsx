import { PropsWithChildren } from "react";
import { Transaction } from "types/server/aws";
import TableSection, { Cells } from "components/TableSection/TableSection";
import getTxUrl from "helpers/getTxUrl";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";

export default function TransactionsTable(props: {
  transactions: Transaction[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (props.isLoading) {
    return <Tooltip>loading transactions..</Tooltip>;
  }

  if (props.isError) {
    return <Tooltip>failed to get transactions..</Tooltip>;
  }

  return (
    <table className="mt-4 w-full text-white/80">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="px-2 first:pl-0 last:pr-0 text-left">
          <>Type</>
          <>Amount</>
          <>Date</>
          <>Wallet</>
          <>Transaction Hash</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {props.transactions.map((tx) => (
          <Cells
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0"
            key={tx.sort_key}
          >
            <p className="capitalize">{tx.transaction_type}</p>
            <p className="text-base font-bold">$ {toCurrency(tx.amount)}</p>
            <span className="text-base">
              {tx.transaction_date.substring(0, 10)}
            </span>
            <span className="font-mono">{maskAddress(tx.wallet_address)}</span>
            <a
              href={getTxUrl(tx.chain_id!, tx.sort_key)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
            >
              <span className="inline-block text-base w-36 truncate">
                {tx.sort_key}
              </span>
            </a>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

function Tooltip(props: PropsWithChildren<{}>) {
  return <p className="text-white font-mono text-sm">{props.children}</p>;
}
