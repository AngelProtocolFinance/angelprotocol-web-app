import Decimal from "decimal.js";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FundSendMeta } from "pages/Admin/types";
import { FundSendValues } from "pages/Admin/types";
import { EndowmentAdminParams } from "pages/EndowmentAdmin/types";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "types/server/contracts";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useGetter, useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Admin from "contracts/Admin";
import CW20 from "contracts/CW20";
import { contracts } from "constants/contracts";
import { denoms } from "constants/currency";
import genProposalsLink from "../../genProposalsLink";

export default function useTransferFunds() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
  const { showModal } = useModalContext();
  const { address: endowmentAddr } = useParams<EndowmentAdminParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);

  function transferFunds(data: FundSendValues) {
    const balance =
      data.currency === denoms.uusd ? data.nativeBalance : data.haloBalance;
    const denomText =
      data.currency === denoms.uusd
        ? wallet?.chain.native_currency.symbol
        : "HALO";
    if (data.amount > balance) {
      showModal(Popup, {
        message: `not enough ${denomText} balance`,
      });
      return;
    }

    let embeddedMsg: EmbeddedWasmMsg | EmbeddedBankMsg;
    //this wallet is not even rendered when wallet is disconnected
    const cw20Contract = new CW20(wallet, contracts.halo_token);
    if (data.currency === denoms.halo) {
      embeddedMsg = cw20Contract.createEmbeddedTransferMsg(
        data.amount,
        data.recipient
      );
    } else {
      embeddedMsg = cw20Contract.createEmbeddedBankMsg(
        [
          {
            amount: new Decimal(data.amount).mul(1e6).divToInt(1).toString(),
            denom: "uusd",
          },
        ],
        data.recipient
      );
    }

    const adminContract = new Admin(wallet, cwContracts);
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
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
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
