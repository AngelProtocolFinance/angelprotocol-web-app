import { ProposalDetails } from "services/types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function Votes({
  id,
  signed,
  signers,
  status,
  classes = "",
}: ProposalDetails & { classes?: string }) {
  const { multisig } = useAdminResources();
  const { wallet } = useGetWallet();
  const send = useTxSender();
  const userSigned = signed.some((s) => s === wallet?.address);

  async function revoke(sender: string) {
    await send({
      content: {
        type: "evm",
        val: createTx(sender, "multisig.revoke-tx", {
          multisig,
          id,
        }),
      },
      tagPayloads: [invalidateJunoTags(["multisig.txs"])],
    });
  }

  const disabled = status === "executed";
  return (
    <ul
      className={
        classes + " grid rounded border border-prim divide-y divide-prim"
      }
    >
      {signers.map((s) => {
        const confirmed = signed.includes(s);
        return (
          <li key={s} className="p-3 flex items-center  text-sm">
            <span className="mr-auto">{s}</span>
            {userSigned &&
            status !== "executed" &&
            wallet &&
            wallet.address === s ? (
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
