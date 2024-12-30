import type { ProgramUpdate } from "@better-giving/endowment";
import type { FieldNamesMarkedBoolean } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router";
import type { FV } from "./schema";

export default function useSubmit(
  df: Partial<Readonly<FieldNamesMarkedBoolean<FV>>>
) {
  const fetcher = useFetcher();

  const submit: SubmitHandler<FV> = async (fv) => {
    const update: ProgramUpdate = {};
    if (df.image) update.banner = fv.image;
    if (df.description) update.description = fv.description.value;
    if (df.title) update.title = fv.title;
    if (df.targetRaise) {
      update.targetRaise = fv.targetRaise ? +fv.targetRaise : null;
    }

    fetcher.submit(update, {
      method: "POST",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, isLoading: fetcher.state !== "idle" };
}
