import Prompt, { TxPrompt } from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { SubmitHandler } from "react-hook-form";
import {
  useDeleteMilestoneMutation,
  useEditMilestoneMutation,
} from "services/aws/milestones";
import { MilestoneUpdate } from "types/aws";
import { useAdminContext } from "../../../Context";
import { uploadImg } from "../common";
import { FV } from "./types";

export default function useMutate(milestoneId: string, programId: string) {
  const { id } = useAdminContext();

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [editMilestone] = useEditMilestoneMutation();
  const [deleteMilestone, { isLoading: isDeletingMilestone }] =
    useDeleteMilestoneMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      const imageURL = await uploadImg(fv.media, () => {
        showModal(
          TxPrompt,
          { loading: "Uploading image.." },
          { isDismissible: false }
        );
      });

      const update: MilestoneUpdate = {
        id: milestoneId,
        media: imageURL,
        description: fv.description.value,
        title: fv.title,
        date: new Date(fv.date).toISOString(),
      };
      await editMilestone({
        endowId: id,
        programId,
        ...cleanObject(update),
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Milestone successfully updated!",
      });
    } catch (err) {
      handleError(err, { context: "applying milestone changes" });
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    try {
      if (!window.confirm("Delete milestone?")) return;

      await deleteMilestone({
        endowId: id,
        programId,
        milestoneId,
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Milestone deleted",
      });
    } catch (err) {
      handleError(err, { context: "deleting milestone" });
    }
  };

  return { submit, handleDeleteMilestone, isDeletingMilestone };
}
