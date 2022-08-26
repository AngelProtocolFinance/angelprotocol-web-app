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
        {props.withdraws.map((log) => {
          // const txHash =
          //   log.axelar_transaction_hash || log.connext_transaction_hash;
          // const isProcessing = txHash === undefined;
          // const isAxlr =
          //   !isProcessing && log.axelar_transaction_hash !== undefined;

          return (
            <Cells type="td" cellClass="" key={log.proposal_id}>
              {/* <>
                {humanize(log.Proposal.amount, 3)} {log.Proposal.symbol}
              </> */}
              <></>
              <></>
              <></>
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}
