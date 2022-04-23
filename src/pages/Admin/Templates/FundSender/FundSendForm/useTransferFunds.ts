import { Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProposalMeta } from "pages/Admin/types";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useModalContext } from "components/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import Halo from "contracts/Halo";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "contracts/types";
import useWalletContext from "hooks/useWalletContext";
import { currency_text, denoms } from "constants/currency";
import { proposalTypes } from "constants/routes";
import genProposalsLink from "../../genProposalsLink";
import { FundSendValues } from "../fundSendSchema";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { wallet } = useWalletContext();
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);

  function transferFunds(data: FundSendValues) {
    const balance =
      data.currency === denoms.uusd ? data.ustBalance : data.haloBalance;
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${currency_text[data.currency]} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    const haloContract = new Halo(wallet);
    if (data.currency === denoms.uhalo) {
      embeddedMsg = haloContract.createEmbeddedHaloTransferMsg(
        data.amount,
        data.recipient
      );
    } else {
      embeddedMsg = haloContract.createdEmbeddedBankMsg(
        [
          {
            amount: new Dec(data.amount).mul(1e6).toInt().toString(),
            denom: denoms.uusd,
          },
        ],
        data.recipient
      );
    }

    const adminContract = new Admin(cwContracts, wallet);
    const fundTransferMeta: ProposalMeta = {
      type: proposalTypes.adminGroup_fundTransfer,
      data: {
        amount: data.amount,
        currency: data.currency,
        recipient: data.recipient,
      },
    };
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [embeddedMsg],
      JSON.stringify(fundTransferMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: genProposalsLink(cwContracts, endowmentAddr),
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
