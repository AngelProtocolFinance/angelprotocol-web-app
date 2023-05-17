import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import useTxSender from "hooks/useTxSender";
import { chainIds } from "constants/chainIds";
import { constructTx } from "./constructTx";
import useLogWithdrawProposal from "./useLogWithdrawProposal";

export default function useWithdraw() {
  const { handleSubmit } = useFormContext<WithdrawValues>();

  const { multisig, id, propMeta, getWallet, ...endow } =
    useAdminResources<"charity">();

  const sendTx = useTxSender();
  const logProposal = useLogWithdrawProposal(propMeta.successMeta);

  async function withdraw(data: WithdrawValues) {
    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const { tx, isDirect, isPolygon } = constructTx(
      wallet.address,
      id,
      endow,
      data
    );

    await sendTx({
      content: { type: "evm", val: tx },
      ...propMeta,
      isAuthorized:
        propMeta.isAuthorized ||
        isDirect /** if whitelisted, could send this tx */,
      onSuccess: isPolygon
        ? undefined //no need to POST to AWS if destination is polygon
        : async (response, chain) =>
            await logProposal(
              {
                endowment_multisig: multisig,
                proposal_chain_id: chainIds.polygon,
                target_chain: data.network,
                target_wallet: data.beneficiary,
                type: data.type,
              },
              response,
              chain
            ),
    });
  }

  return handleSubmit(withdraw);
}
