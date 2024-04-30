import Prompt, { TxPrompt } from "components/Prompt";
import { adminRoutes, appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";

import { cleanObject } from "helpers/cleanObject";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useEditProgramMutation } from "services/aws/programs";
import { Program, ProgramUpdate } from "types/aws";
import { useAdminContext } from "../../../Context";
import { uploadImg } from "../common";
import { FV } from "./types";

export default function useSubmit(
  methods: UseFormReturn<FV>,
  initProgram: Program
) {
  const { id } = useAdminContext();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [updateProgram] = useEditProgramMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      const imageURL = await uploadImg(fv.image, () => {
        showModal(
          TxPrompt,
          { loading: "Uploading image.." },
          { isDismissible: false }
        );
      });

      const update: ProgramUpdate = cleanObject({
        id: initProgram.id,
        banner: imageURL,
        description: fv.description.value,
        title: fv.title,
      });
      await updateProgram({ endowId: id, ...update }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Program information updated",
      });
    } catch (err) {
      handleError(err, { context: "applying program info changes" });
    }
  };

  return {
    reset,
    submit: handleSubmit(submit),
    isSubmitting,
    isDirty,
  };
}
