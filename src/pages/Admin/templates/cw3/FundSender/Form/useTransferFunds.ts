import { useFormContext } from "react-hook-form";
import { FundSendMeta } from "pages/Admin/types";
import { FundSendValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Prompt from "components/Prompt";
import CW3 from "contracts/CW3";
import { embedMsg } from "contracts/createCosmosMsg";
import useTxSender from "hooks/useTxSender";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { contracts } from "constants/contracts";
import { axlUSDCDenom, denoms, tokens } from "constants/tokens";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const { multisig, propMeta } = useAdminResources();
  //TODO: use wallet token[] to list amounts to transfer
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function transferFunds(data: FundSendValues) {
    const balance =
      data.denom === axlUSDCDenom ? data.usdBalance : data.haloBalance;
    if (data.amount > balance) {
      return showModal(Prompt, {
        type: "error",
        title: "Transfer Funds",
        headline: "Insufficient Balance",
        children: `Not enough ${tokens[data.denom]} balance`,
      });
    }

    const scaled = scaleToStr(data.amount /** TODO: include decimal */);
    const embedded =
      data.denom === denoms.halo
        ? embedMsg("cw20.transfer", {
            cw20: contracts["halo"],
            recipient: data.recipient,
            amount: scaled,
          })
        : embedMsg("recipient.send", {
            recipient: data.recipient,
            denom: denoms.axlusdc,
            amount: scaled,
          });

    const contract = new CW3(wallet, multisig);
    const fundTransferMeta: FundSendMeta = {
      type: "cw3_transfer",
      data: {
        amount: data.amount,
        denom: data.denom,
        recipient: data.recipient,
      },
    };
    const proposalMsg = contract.createProposalMsg(
      data.title,
      data.description,
      [embedded],
      JSON.stringify(fundTransferMeta)
    );

    await sendTx({
      content: { type: "cosmos", val: [proposalMsg] },
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_transfer"),
    });
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
