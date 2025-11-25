import { Field } from "components/form";
import { Select } from "components/selector";
import { useController } from "react-hook-form";
import { useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { ILoaderData } from "../api";
import type { FV } from "../schema";
import { NpoSelector } from "./npo-selector";

export const form_style = "w-full text-gray-d4 dark:text-white p-3";

interface Props extends ILoaderData {
  classes?: string;
}

export function Form({ classes = "", ...p }: Props) {
  const fetcher = useFetcher();

  const init: FV = { tag: "", program: "" };
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useRemixForm<FV>({
    defaultValues: init,
    fetcher,
  });

  const { field: prog } = useController<FV, "program">({
    name: "program",
    control,
  });

  return (
    <fetcher.Form
      method="PUT"
      onSubmit={handleSubmit}
      className={`${classes} ${form_style} grid gap-5 p-4`}
      autoComplete="off"
      autoSave="off"
    >
      {p.npos?.opts && <NpoSelector opts={p.npos.opts} value={p.npos.value} />}

      {p.programs.length > 0 && (
        <Select
          label="Select program"
          required={false}
          value={prog.value ?? ""}
          onChange={prog.onChange}
          options={p.programs.map((x) => x.id)}
          error={errors.program?.message}
          ref={prog.ref}
          classes={{ option: "text-sm", container: "mb-4" }}
          option_disp={(x) => p.programs.find((pr) => pr.id === x)?.title || ""}
        />
      )}

      <Field
        sub="A meaningful tag to help you identify this form."
        {...register("tag")}
        label="First name"
        placeholder="e.g. in mywebsite.com"
        required={false}
        error={errors.tag?.message}
      />

      <button
        className="col-span-full btn btn-blue text-sm"
        disabled={fetcher.state !== "idle"}
        type="submit"
      >
        {fetcher.state !== "idle" ? "Processing..." : "Submit"}
      </button>
    </fetcher.Form>
  );
}
