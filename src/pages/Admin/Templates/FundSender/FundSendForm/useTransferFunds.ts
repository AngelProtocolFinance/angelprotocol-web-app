import { Dec } from "@terra-money/terra.js";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { chainIDs } from "constants/chainIDs";
import { contracts } from "constants/contracts";
import { currency_text, denoms } from "constants/currency";
import { proposalTypes } from "constants/routes";
import Admin from "contracts/Admin";
import Halo from "contracts/Halo";
import { EmbeddedBankMsg, EmbeddedWasmMsg } from "contracts/types";
import useWalletContext from "hooks/useWalletContext";
import { ProposalMeta } from "pages/Admin/types";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { admin, tags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import genProposalsLink from "../../genProposalsLink";
import { FundSendValues } from "../fundSendSchema";

export default function useTransferFunds() {
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<FundSendValues>();
  const dispatch = useSetter();
  const { showModal } = useSetModal();
  const { wallet } = useWalletContext();
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const cw3address =
    cwContracts === "apTeam"
      ? contracts[wallet?.network.chainID || chainIDs.testnet].apCW3
      : cwContracts.cw3;

  const {
    main: ustBalance,
    terraBalancesLoading,
    isTerraBalancesFailed,
  } = useBalances(denoms.uusd, [], cw3address);

  const { haloBalance, haloBalanceLoading, isHaloBalanceFailed } =
    useHaloBalance(cw3address);

  const isBalancesLoading = haloBalanceLoading || terraBalancesLoading;
  const isBalancesError = isTerraBalancesFailed || isHaloBalanceFailed;

  useEffect(() => {
    if (isBalancesLoading) return;
    if (isBalancesError) {
      showModal(Popup, { message: "failed to get form resources" });
      return;
    }
    //validate to trigger render, and update watchers
    setValue("haloBalance", haloBalance, { shouldValidate: true });
    setValue("ustBalance", ustBalance, { shouldValidate: true });
    //eslint-disable-next-line
  }, [isBalancesLoading, isBalancesError, haloBalance, ustBalance]);

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
    isSubmitDisabled:
      isSubmitting ||
      !isValid ||
      !isDirty ||
      isBalancesError ||
      isBalancesLoading,
  };
}
