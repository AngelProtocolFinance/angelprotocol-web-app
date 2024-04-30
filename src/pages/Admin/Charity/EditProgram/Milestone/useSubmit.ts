import { TxPrompt } from "components/Prompt";
import { adminRoutes, appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEditMilestoneMutation } from "services/aws/milestones";
import { MilestoneUpdate } from "types/aws";
import { useAdminContext } from "../../../Context";
import { uploadImg } from "../common";
import { FV } from "./types";

export default function useSubmit(
  methods: UseFormReturn<FV>,
  milestoneId: string,
  programId: string
) {
  const { id } = useAdminContext();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  const [editMilestone] = useEditMilestoneMutation();

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
      };
      await editMilestone({
        endowId: id,
        programId,
        ...cleanObject(update),
      }).unwrap();
      navigate(`${appRoutes.admin}/${id}/${adminRoutes.programs}`);
    } catch (err) {
      handleError(err, { context: "applying milestone changes" });
    }
  };

  return {
    reset,
    submit: handleSubmit(submit),
    isSubmitting,
    isDirty,
  };
}
