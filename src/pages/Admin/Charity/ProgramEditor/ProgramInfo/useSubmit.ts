import { uploadFile } from "helpers/uploadFile";
import type { FieldNamesMarkedBoolean, SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router-dom";
import { toast } from "sonner";
import type { ProgramUpdate } from "types/aws";
import type { FV } from "./types";

export default function useSubmit(
  df: Partial<Readonly<FieldNamesMarkedBoolean<FV>>>
) {
  const fetcher = useFetcher();

  const submit: SubmitHandler<FV> = async (fv) => {
    let banner = fv.image.publicUrl;
    if (fv.image.file) {
      const obj = await uploadFile(fv.image.file, "endow-profiles");
      if (!obj) return toast.error("Failed to upload program banner");
      banner = obj.publicUrl;
    }
    const update: ProgramUpdate = {};
    if (df.image) {
      update.banner = banner;
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
