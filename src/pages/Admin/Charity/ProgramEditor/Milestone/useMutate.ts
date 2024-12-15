import type { MilestoneUpdate } from "@better-giving/endowment";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import type { SubmitHandler } from "react-hook-form";
import {
  useDeleteMilestoneMutation,
  useEditMilestoneMutation,
} from "services/aws/milestones";
import { useAdminContext } from "../../../Context";
import type { FV } from "./schema";

export default function useMutate(milestoneId: string, programId: string) {
  const { id } = useAdminContext();

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [editMilestone] = useEditMilestoneMutation();
  const [deleteMilestone, { isLoading: isDeletingMilestone }] =
    useDeleteMilestoneMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      const update: MilestoneUpdate = {
        media: fv.media,
        description: fv.description.value,
        title: fv.title,
        date: new Date(fv.date).toISOString(),
      };

      await editMilestone({
        id: milestoneId,
        endowId: id,
        programId: programId,
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
