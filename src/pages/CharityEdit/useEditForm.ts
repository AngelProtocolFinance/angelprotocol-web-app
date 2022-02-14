import { useSetModal } from "components/Nodal/Nodal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useFormContext } from "react-hook-form";
import { useRouteMatch } from "react-router-dom";
import { useUpdateProfileMutation } from "services/aws/endowments/endowments";
import { useProfileState } from "services/aws/endowments/states";
import { EditableProfileAttr } from "services/aws/endowments/types";
import { CharityParam } from "./types";

export default function useEditForm() {
  const { handleSubmit } = useFormContext<EditableProfileAttr>();
  const { params } = useRouteMatch<CharityParam>();
  const endowment_addr = params.address;

  const { profileState } = useProfileState(endowment_addr);
  const [update] = useUpdateProfileMutation();

  const { showModal } = useSetModal();

  const updateProfile = async (data: EditableProfileAttr) => {
    console.log(data);
    try {
      const response = await update({
        owner: profileState.charity_owner,
        address: profileState.endowment_address,
        edits: data,
      });
      if ("error" in response) {
        showModal<PopupProps>(Popup, { message: "Failed to save profile" });
      } else {
        showModal<PopupProps>(Popup, { message: "Successfully saved changes" });
      }
    } catch (e) {
      showModal<PopupProps>(Popup, {
        message: "Unknown error occured. Failed to save profile",
      });
    }
  };
  return { updateProfile: handleSubmit(updateProfile), endowment_addr };
}
