import { Dec } from "@terra-money/terra.js";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "@types-server/contracts";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProposalMeta } from "pages/Admin/types";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Halo from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";
import { currency_text } from "constants/currency";
import { proposalTypes } from "constants/routes";
import genProposalsLink from "../../genProposalsLink";
import { FundSendValues } from "../fundSendSchema";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { showModal } = useSetModal();
  const { wallet } = useWalletContext();
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);

  function transferFunds(data: FundSendValues) {
    const balance =
      data.currency === "uusd" ? data.ustBalance : data.haloBalance;
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${currency_text[data.currency]} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    const haloContract = new Halo(wallet);
    if (data.currency === "uhalo") {
      embeddedMsg = haloContract.createEmbeddedHaloTransferMsg(
        data.amount,
        data.recipient
      );
    } else {
      embeddedMsg = haloContract.createdEmbeddedBankMsg(
        [
          {
            amount: new Dec(data.amount).mul(1e6).toInt().toString(),
            denom: "uusd",
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
            { type: terraTags.admin, id: adminTags.proposals },
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
