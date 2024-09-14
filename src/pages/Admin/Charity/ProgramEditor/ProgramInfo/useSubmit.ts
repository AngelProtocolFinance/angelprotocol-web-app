import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";

import { cleanObject } from "helpers/cleanObject";
import type { SubmitHandler } from "react-hook-form";
import { useEditProgramMutation } from "services/aws/programs";
import type { Program, ProgramUpdate } from "types/aws";
import { useAdminContext } from "../../../Context";
import { uploadImg } from "../common";
import type { FV } from "./types";

export default function useSubmit(initProgram: Program) {
  const { id } = useAdminContext();

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [updateProgram] = useEditProgramMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      const imageURL = await uploadImg(fv.image, () => {
        showModal(
          Prompt,
          { type: "loading", children: "Uploading image.." },
          { isDismissible: false }
        );
      });

      const update: ProgramUpdate = {
        id: initProgram.id,
        banner: imageURL,
        description: fv.description.value,
        title: fv.title,
      };

      await updateProgram({
        endowId: id,
        ...cleanObject(update),
        targetRaise: +fv.targetRaise || null,
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Program information updated",
      });
    } catch (err) {
      handleError(err, { context: "applying program info changes" });
    }
  };

  return submit;
}
