import { useFormContext } from "react-hook-form";
import { FundSendMeta } from "pages/Admin/types";
import { FundSendValues } from "pages/Admin/types";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import Popup from "components/Popup";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction";
import CW3 from "contracts/CW3";
import CW20 from "contracts/CW20";
import { scaleToStr } from "helpers";
import { getTagPayloads } from "helpers/admin";
import { contracts } from "constants/contracts";
import { axlUSDCDenom, denoms, tokens } from "constants/tokens";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { cw3, propMeta } = useAdminResources();
  //TODO: use wallet token[] to list amounts to transfer
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();

  function transferFunds(data: FundSendValues) {
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
        data.amount,
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

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        ...propMeta,
        tagPayloads: getTagPayloads(propMeta.willExecute && "cw3_transfer"),
      })
    );
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
