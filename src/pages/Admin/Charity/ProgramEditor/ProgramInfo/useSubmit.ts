import type { Program, ProgramUpdate } from "@better-giving/endowment";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import type { SubmitHandler } from "react-hook-form";
import { useEditProgramMutation } from "services/aws/programs";
import { useAdminContext } from "../../../Context";
import type { FV } from "./schema";

export default function useSubmit(initProgram: Program) {
  const { id } = useAdminContext();

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [updateProgram] = useEditProgramMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      const update: ProgramUpdate = {
        banner: fv.image,
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
