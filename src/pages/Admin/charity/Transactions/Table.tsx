import { WithdrawLog } from "types/server/aws";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import TableSection, { Cells } from "components/TableSection";
import { getTxUrl, humanize, maskAddress } from "helpers";

export default function TransactionsTable(props: { withdraws: WithdrawLog[] }) {
  const { wallet } = useGetWallet();

  return (
    <table className="">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="">
          <>Amount</>
          <>Receiver</>
          <>Status</>
          <>Amount Received</>
          <>Transaction hash</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10"
      >
        {props.withdraws.map((tx) => (
          <Cells
            type="td"
            cellClass=""
            key={tx.Proposal.axelar_transaction_hash}
          >
            <>
              {humanize(tx.Proposal.amount, 3)} {tx.Proposal.symbol}
            </>
            <></>
            <></>
            <></>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}
