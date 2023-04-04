import { useFormContext } from "react-hook-form";
import createCosmosMsg, { embedMsg } from "tx/createCosmosMsg";
import { OwnerUpdateMeta, RegistrarOwnerValues } from "pages/Admin/types";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import useTxSender from "hooks/useTxSender";

export default function useUpdateOwner() {
  const { cw3, propMeta } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarOwnerValues>();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function updateOwner(data: RegistrarOwnerValues) {
    //check for changes
    if (data.initialOwner === data.new_owner) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Owner",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    const ownerUpdateMeta: OwnerUpdateMeta = {
      type: "reg_owner",
      data: { owner: data.initialOwner, newOwner: data.new_owner },
    };

    const msg = createCosmosMsg("sender", "cw3.propose", {
      cw3,
      title: data.title,
      description: data.description,
      msgs: [embedMsg("registrar.update-owner", { new_owner: data.new_owner })],
      meta: JSON.stringify(ownerUpdateMeta),
    });

    await sendTx({
      content: { type: "cosmos", val: [msg] },
      ...propMeta,
    });
  }

  return {
    updateOwner: handleSubmit(updateOwner),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
