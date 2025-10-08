import type { IProgramUpdate } from "@better-giving/endowment";
import { use_action_result } from "hooks/use-action-result";
import type { FieldNamesMarkedBoolean } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useFetcher } from "react-router";
import type { FV } from "./schema";

export default function useSubmit(
  df: Partial<Readonly<FieldNamesMarkedBoolean<FV>>>
) {
  const fetcher = useFetcher();
  use_action_result(fetcher.data);

  const submit: SubmitHandler<FV> = async (fv) => {
    const update: IProgramUpdate = {};
    if (df.image) update.banner = fv.image;
    if (df.description) update.description = fv.description.value;
    if (df.title) update.title = fv.title;
    if (df.target_raise) {
      update.targetRaise = fv.target_raise ? +fv.target_raise : null;
    }

    fetcher.submit(update, {
      method: "POST",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, is_loading: fetcher.state !== "idle" };
}
