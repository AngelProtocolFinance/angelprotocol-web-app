import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { UpdateProfilePayload as UP } from "@types-server/contracts";
import { ObjectEntries } from "@types-utils";
import genDiffMeta from "pages/Admin/Templates/genDiffMeta";
import genProposalsLink from "pages/Admin/Templates/genProposalsLink";
import { ProposalMeta } from "pages/Admin/types";
import { EndowmentAddrParams } from "pages/EndowmentAdmin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useGetter, useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Account from "contracts/Account";
import Admin from "contracts/Admin";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import { proposalTypes } from "constants/routes";
import { UpdateProfileValues } from "./profileEditSchema";

export default function useEditProfile() {
  const { address: endowmentAddr } = useParams<EndowmentAddrParams>();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<UpdateProfileValues>();
  const { wallet } = useWalletContext();
  const { cwContracts } = useGetter((state) => state.admin.cwContracts);
  const dispatch = useSetter();
  const { showModal } = useSetModal();

  const editProfile = async ({
    title,
    description,
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
    const diff = getPayloadDiff(initialProfile, data);
    if ("overview" in diff) {
      diff.overview = "[text]";
    }

    const diffEntries = Object.entries(diff) as ObjectEntries<UP>;
    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    const accountContract = new Account(endowmentAddr!, wallet);
    const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
      //don't pass just diff here, old value should be included for null will be set if it's not present in payload
      cleanObject(data)
    );

    const profileUpdateMeta: ProposalMeta = {
      type: proposalTypes.endowment_updateProfile,
      data: genDiffMeta(diffEntries, initialProfile),
    };

    const adminContract = new Admin(cwContracts, wallet);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [profileUpdateMsg],
      JSON.stringify(profileUpdateMeta)
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
        successMessage: "Profile update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  };
  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
  };
}
