import { ProposalDetails } from "services/types";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { useGetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { createTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";

export default function Votes({
  id,
  signed,
  signers,
  status,
  classes = "",
}: ProposalDetails & { classes?: string }) {
  const { multisig, propMeta } = useAdminResources();
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
      isAuthorized: propMeta.isAuthorized,
      tagPayloads: [invalidateJunoTags(["multisig.txs"])],
    });
  }

  const disabled = status === "executed";

  return (
    <table className="w-full table-auto">
      <TableSection rowClass="bg-orange-l6 dark:bg-bluegray-d1" type="thead">
        <Cells
          type="th"
          cellClass="last:w-16 p-4 text-xs text-left border border-prim uppercase font-heading"
        >
          <>Addresses</>
          <>Vote</>
          <>Action</>
        </Cells>
      </TableSection>
      <TableSection type="tbody" rowClass="bg-orange-l6 dark:bg-blue-d6">
        {signers.map((s) => {
          const confirmed = signed.includes(s);
          return (
            <Cells
              type="td"
              cellClass="p-4 text-xs text-left border border-prim"
              key={s}
            >
              <p className="pl-2">
                <span className="mr-auto">{s}</span>
              </p>
              <p
                className={`pl-2 ${
                  confirmed ? "text-green-l1" : "text-red"
                } capitalize`}
              >
                <Icon
                  type={confirmed ? "CheckCircle" : "Circle"}
                  className={
                    confirmed ? "text-green text-lg" : "text-gray text-sm"
                  }
                />
              </p>
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
              ) : (
                <></>
              )}
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}
