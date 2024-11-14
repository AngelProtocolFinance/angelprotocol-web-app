import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";

import type { Program, ProgramUpdate } from "@better-giving/endowment";
import { cleanObject } from "helpers/cleanObject";
import { uploadFile } from "helpers/uploadFile";
import type { SubmitHandler } from "react-hook-form";
import { useEditProgramMutation } from "services/aws/programs";
import { useAdminContext } from "../../../Context";
import type { FV } from "./types";

export default function useSubmit(initProgram: Program) {
  const { id } = useAdminContext();

  const { showModal } = useModalContext();
  const { handleError, displayError } = useErrorContext();
  const [updateProgram] = useEditProgramMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      let banner = fv.image.publicUrl;
      if (fv.image.file) {
        const obj = await uploadFile(fv.image.file, "endow-profiles");
        if (!obj) return displayError("Failed to upload program banner");
        banner = obj.publicUrl;
      }

      const update: ProgramUpdate = {
        banner,
        description: fv.description.value,
        title: fv.title,
      };

      await updateProgram({
        id: initProgram.id,
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
