import { ImgLink } from "components/ImgEditor";
import { TxPrompt } from "components/Prompt";
import { adminRoutes, appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { isEmpty } from "helpers";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNewProgramMutation } from "services/aws/aws";
import { useAdminContext } from "../../Context";
import { FV } from "./types";

export default function useSubmit(methods: UseFormReturn<FV>) {
  const { id } = useAdminContext();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { showModal } = useModalContext();
  const { handleError, displayError } = useErrorContext();
  const [createProgram] = useNewProgramMutation();

  const submit: SubmitHandler<FV> = async (fv) => {
    try {
      if (fv.milestones.length >= 24) {
        return displayError("Number of milestones should not exceed 24");
      }

      const [imageURL, ...milestoneMediaURLs] = await uploadImgs(
        [fv.image, ...fv.milestones.map((m) => m.media)],
        () => {
          showModal(
            TxPrompt,
            { loading: "Uploading images.." },
            { isDismissible: false }
          );
        }
      );

      //having initial value means form is for editing
      await createProgram({
        title: fv.title,
        description: fv.description.value,
        banner: imageURL,
        milestones: fv.milestones.map(({ idx: _, ...m }, i) => ({
          ...m,
          date: new Date(m.date).toISOString(),
          media: milestoneMediaURLs[i],
          description: m.description.value,
        })),
      });

      navigate(`${appRoutes.admin}/${id}/${adminRoutes.programs}`);
    } catch (err) {
      handleError(err, { context: "applying program changes" });
    }
  };

  return {
    reset,
    submit: handleSubmit(submit),
    isSubmitting,
    id,
  };
}

async function uploadImgs(
  imgs: ImgLink[],
  onUpload: () => void
): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  if (!isEmpty(files)) onUpload();
  const baseURL = await uploadFiles(files, "endow-profiles");
  return imgs.map((img) =>
    img.file && baseURL ? getFullURL(baseURL, img.file.name) : img.publicUrl
  );
}
