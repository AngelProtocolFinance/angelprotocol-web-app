import { Transaction } from "types/tx";
import { invalidateJunoTags } from "services/juno";
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
      tagPayloads: [invalidateJunoTags([])],
    });
  }

  const disabled = status === "approved";
  return (
    <ul
      className={
        classes +
        " grid rounded border border-gray-l3 dark:border-bluegray divide-y divide-prim"
      }
    >
      {owners.map((o) => {
        const confirmed = confirmations.includes(o);
        return (
          <li key={o} className="p-3 flex items-center  text-sm">
            <span className="mr-auto">{o}</span>
            {userSigned &&
            status === "open" &&
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
