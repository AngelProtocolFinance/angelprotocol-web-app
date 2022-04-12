import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import getPayloadDiff from "helpers/getPayloadDiff";
import { CharityParam } from "./types";
import { UpdateProfileValues } from "./profileEditSchema";
import { ObjectEntries } from "types/utils";
import { UpdateProfilePayload as UP } from "contracts/types";
import Account from "contracts/Account";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import { ProposalMeta } from "pages/Admin/types";
import { proposalTypes } from "constants/routes";
import genDiffMeta from "pages/Admin/Templates/genDiffMeta";
import Admin from "contracts/Admin";
import { useGetter, useSetter } from "store/accessors";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import genProposalsLink from "pages/Admin/Templates/genProposalsLink";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";

export default function useEditProfile() {
  const { address: endowmentAddr } = useParams<CharityParam>();
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
    const diffEntries = Object.entries(diff) as ObjectEntries<UP>;
    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }
    const accountContract = new Account(endowmentAddr!, wallet);
    const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
      cleanObject(diff)
    );

    console.log(cleanObject(diff));
    return;

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
            { type: tags.admin, id: admin.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
        successMessage: "Config update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  };
  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
  };
}
