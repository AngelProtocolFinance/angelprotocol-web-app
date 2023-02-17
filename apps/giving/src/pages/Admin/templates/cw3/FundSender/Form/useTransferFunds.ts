import Popup from "@/components/Popup";
import { useAdminResources } from "@/pages/Admin/Guard";
import { axlUSDCDenom, contracts, denoms, tokens } from "@ap/constants";
import { useModalContext } from "@ap/contexts";
import { useGetWallet } from "@ap/contexts/wallet-context";
import { CW3, CW20 } from "@ap/contracts";
import { getTagPayloads, scaleToStr } from "@ap/helpers";
import useCosmosTxSender from "@ap/hooks/use-cosmos-tx-sender";
import { useFormContext } from "react-hook-form";
import { FundSendMeta } from "@/pages/Admin/types";
import { FundSendValues } from "@/pages/Admin/types";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "@ap/types/contracts";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const { cw3, propMeta } = useAdminResources();
  //TODO: use wallet token[] to list amounts to transfer
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function transferFunds(data: FundSendValues) {
    const balance =
      data.denom === axlUSDCDenom ? data.usdBalance : data.haloBalance;
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${tokens[data.denom]} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    //this wallet is not even rendered when wallet is disconnected
    const cw20Contract = new CW20(wallet, contracts.halo_token);
    if (data.denom === denoms.halo) {
      embeddedMsg = cw20Contract.createEmbeddedTransferMsg(
        scaleToStr(data.amount), //halo decimals:6
        data.recipient
      );
    } else {
      embeddedMsg = cw20Contract.createEmbeddedBankMsg(
        [
          {
            amount: scaleToStr(data.amount),
            denom: denoms.axlusdc,
          },
        ],
        data.recipient
      );
    }

    const contract = new CW3(wallet, cw3);
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
      [embeddedMsg],
      JSON.stringify(fundTransferMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
      tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_transfer"),
    });
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
