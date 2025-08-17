import type { IProgramUpdate } from "@better-giving/endowment";
import { useFetcher } from "@remix-run/react";
import { useActionResult } from "hooks/use-action-result";
import type { FieldNamesMarkedBoolean } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { FV } from "./schema";

export default function useSubmit(
  df: Partial<Readonly<FieldNamesMarkedBoolean<FV>>>
) {
  const fetcher = useFetcher();
  useActionResult(fetcher.data);

  const submit: SubmitHandler<FV> = async (fv) => {
    const update: IProgramUpdate = {};
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
