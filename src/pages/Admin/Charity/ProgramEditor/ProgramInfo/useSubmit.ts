import type { FieldNamesMarkedBoolean, SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import type { ProgramUpdate } from "types/aws";
import { uploadImg } from "../common";
import type { FV } from "./types";

export default function useSubmit(
  df: Partial<Readonly<FieldNamesMarkedBoolean<FV>>>
) {
  const fetcher = useFetcher();

  const submit: SubmitHandler<FV> = async (fv) => {
    const imageURL = await uploadImg(fv.image, () => {});
    const update: ProgramUpdate = {};
    if (df.image) {
      update.banner = imageURL;
    }
    if (df.description) {
      update.description = fv.description.value;
    }
    if (df.title) {
      update.title = fv.title;
    }

    if (df.targetRaise) {
      update.targetRaise = fv.targetRaise ? +fv.targetRaise : null;
    }

    fetcher.submit(update, {
      method: "post",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, isLoading: fetcher.state !== "idle" };
}
