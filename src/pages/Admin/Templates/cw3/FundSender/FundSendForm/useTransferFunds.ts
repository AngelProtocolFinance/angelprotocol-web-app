import { useFormContext } from "react-hook-form";
import { FundSendMeta } from "pages/Admin/types";
import { FundSendValues } from "pages/Admin/types";
import { Denoms } from "types/lists";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/server/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import CW3 from "contracts/CW3";
import CW20 from "contracts/CW20";
import { scaleToStr } from "helpers";
import { contracts } from "constants/contracts";
import { denoms, symbols } from "constants/currency";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { cw3, proposalLink, chain } = useAdminResources();
  //TODO: use wallet token[] to list amounts to transfer
  const { showModal } = useModalContext();

  function transferFunds(data: FundSendValues) {
    const balance =
      data.currency === denoms.axlusdc ? data.usdBalance : data.haloBalance;
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${symbols[data.currency as Denoms]} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    //this wallet is not even rendered when wallet is disconnected
    const cw20Contract = new CW20(chain, contracts.halo_token);
    if (data.currency === denoms.halo) {
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

    const contract = new CW3(chain, cw3);
    const fundTransferMeta: FundSendMeta = {
      type: "cw3_transfer",
      data: {
        amount: data.amount,
        currency: data.currency,
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
        chain,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: proposalLink,
        successMessage: "Fund transfer proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    transferFunds: handleSubmit(transferFunds),
    isSubmitDisabled: isSubmitting || !isValid || !isDirty,
  };
}
