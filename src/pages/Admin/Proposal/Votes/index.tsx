import { invalidateJunoTags } from "services/juno";
import { Transaction } from "services/subgraph";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { useAdminContext } from "../../Context";

export default function Votes({
  transactionId,
  confirmations,
  owners,
  status,
  classes = "",
}: Transaction & { classes?: string }) {
  const { multisig } = useAdminContext();
  const { wallet } = useGetWallet();
  const send = useTxSender();
  const userSigned = confirmations.some((s) => s === wallet?.address);

  async function revoke(sender: string) {
    await send({
      content: {
        type: "evm",
        val: createTx(sender, "multisig.revoke-tx", {
          multisig,
          id: transactionId,
        }),
      },
      tagPayloads: [invalidateJunoTags(["multisig.txs"])],
    });
  }

  const disabled = status === "approved";
  return (
    <ul
      className={
        classes + " grid rounded border border-prim divide-y divide-prim"
      }
    >
      {owners.map((o) => {
        const confirmed = confirmations.includes(o);
        return (
          <li key={o} className="p-3 flex items-center  text-sm">
            <span className="mr-auto">{o}</span>
            {userSigned &&
            status !== "approved" &&
            wallet &&
            wallet.address === o ? (
              <button
                disabled={disabled}
                type="button"
                onClick={() => revoke(wallet.address)}
                className="text-xs uppercase font-heading mr-2 hover:text-orange"
              >
                revoke
              </button>
            ) : null}
            <Icon
              type={confirmed ? "CheckCircle" : "Circle"}
              className={confirmed ? "text-green text-lg" : "text-gray text-sm"}
            />
          </li>
        );
      })}
    </ul>
  );
}
