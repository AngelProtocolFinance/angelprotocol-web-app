import { useFormContext } from "react-hook-form";
import { OwnerUpdateMeta } from "pages/Admin/types";
import { IndexFundOwnerValues } from "pages/Admin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import genProposalsLink from "../genProposalsLink";

export default function useUpdateOwner() {
  const { walletAddr, displayCoin, providerId } = useGetWallet();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<IndexFundOwnerValues>();

  const { showModal } = useModalContext();
  const dispatch = useSetter();

  async function updateOwner(data: IndexFundOwnerValues) {
    //check for changes
    if (data.initialOwner === data.new_owner) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    const indexFundContract = new Indexfund(walletAddr);
    const configUpdateMsg = indexFundContract.createEmbeddedOwnerUpdateMsg({
      new_owner: data.new_owner,
    });

    const ownerUpdateMeta: OwnerUpdateMeta = {
      type: "indexfund-owner-update",
      data: { owner: data.initialOwner, newOwner: data.new_owner },
    };

    const adminContract = new Admin("apTeam", walletAddr);
    const proposalMsg = adminContract.createProposalMsg(
      data.title,
      data.description,
      [configUpdateMsg],
      JSON.stringify(ownerUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        providerId,
        feeBalance: displayCoin.balance,
        msgs: [proposalMsg],
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
        successMessage: "Owner update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
