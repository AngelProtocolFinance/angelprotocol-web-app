import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import getPayloadDiff from "helpers/getPayloadDiff";
import { CharityParam } from "./types";
import { UpdateProfileValues } from "./profileEditSchema";
import { ObjectEntries } from "types/utils";
import { UpdateProfilePayload as UP } from "contracts/types";

export default function useEditProfile() {
  const params = useParams<CharityParam>();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<UpdateProfileValues>();

  const endowment_addr = params.address;

  const { showModal } = useSetModal();

  const editProfile = async ({
    initialProfile,
    ...data
  }: UpdateProfileValues) => {
    const diff = getPayloadDiff(initialProfile, data);
    const diffEntries = Object.entries(diff) as ObjectEntries<UP>;

    try {
      if (Object.keys(diff).length === 0) {
        showModal<PopupProps>(Popup, { message: "No changes detected" });
        return;
      }
      console.log(diffEntries);
    } catch (e) {
      showModal<PopupProps>(Popup, {
        message: "Unknown error occured. Failed to save profile",
      });
    }
  };
  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
  };
}
