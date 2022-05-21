import { Dec } from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/server/contracts";
import { FundSendMeta } from "pages/Admin/types";
import { FundSendValues } from "pages/Admin/types";
import { EndowmentAdminParams } from "pages/EndowmentAdmin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import CW20 from "contracts/CW20";
import useWalletContext from "hooks/useWalletContext";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import genProposalsLink from "../../genProposalsLink";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { showModal } = useModalContext();
  const { wallet } = useWalletContext();
  const { address: endowmentAddr } = useParams<EndowmentAdminParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);

  function transferFunds(data: FundSendValues) {
    const balance =
      data.currency === denoms.uusd ? data.ustBalance : data.haloBalance;
    const denomText = data.currency === denoms.uusd ? "UST" : "HALO";
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${denomText} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    //this wallet is not even rendered when wallet is disconnected
    const haloContractAddr = contracts[wallet?.network.chainID!]["halo_token"];
    const cw20Contract = new CW20(haloContractAddr, wallet);
    if (data.currency === denoms.halo) {
      embeddedMsg = cw20Contract.createEmbeddedTransferMsg(
        data.amount,
        data.recipient
      );
    } else {
      embeddedMsg = cw20Contract.createdEmbeddedBankMsg(
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
    const fundTransferMeta: FundSendMeta = {
      type: "admin-group-fund-transfer",
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
