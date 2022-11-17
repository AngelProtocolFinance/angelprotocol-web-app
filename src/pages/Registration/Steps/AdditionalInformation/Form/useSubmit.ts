import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues as FV } from "../types";
import { FileObject } from "types/aws";
import { useUpdateRegMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { ImgLink } from "components/ImgEditor";
import { handleMutationResult, uploadToIpfs } from "helpers";
import { useRegState } from "../../StepGuard";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext<FV>();

  const {
    step,
    data: { profile, init },
  } = useRegState<3>();
  const [updateReg] = useUpdateRegMutation();
  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const submit = async ({ overview, ref, ...imgs }: FV) => {
    if (profile && !isDirty) {
      return navigate(`../${step}`, { state: init });
    }

    const previews = await getFilePreviews({ ...imgs });

    handleMutationResult(
      await updateReg({
        type: "profile assets",
        reference: ref,
        Banner: previews.banner,
        Logo: previews.logo,
        Overview: overview,
        KycDonorsOnly: false /**TODO: isKYC part of metaData */,
      }),
      handleError
    );
  };
  return handleSubmit(submit);
}

async function getFilePreviews<T extends { [index: string]: ImgLink }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject }> {
  const idxes: { [index: string]: number } = {};
  let files: File[] = [];

  let pos = 0;
  for (const [key, imgLink] of Object.entries(fields)) {
    idxes[key] = pos;
    if (imgLink.file) {
      files.push(imgLink.file);
      pos++;
    } else {
      continue;
    }
  }

  const urls = await uploadToIpfs(files);
  //map file names to urls
  const previews: FileObject[] = files.map(({ name }, i) => ({
    name,
    publicUrl: urls[i],
  }));

  //rebuild object with preview urls
  const result: any = {};
  for (const [key, idx] of Object.entries(idxes)) {
    const _preview = previews.slice(idx, idx + 1);
    //return previous previews if no new urls
    if (_preview.length <= 0) {
      const { name, publicUrl } = fields[key];
      result[key] = { name, publicUrl };
    } else {
      result[key] = previews[idx];
    }
  }

  return result;
}
