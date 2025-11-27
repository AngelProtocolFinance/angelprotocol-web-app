import { Field as HuiField, Label } from "@headlessui/react";
import { Field } from "components/form";
import { Select } from "components/selector";
import { useController } from "react-hook-form";
import { useFetcher, useNavigation, useSearchParams } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { ILoaderData } from "../api";
import type { FV } from "../schema";
import { NpoSelector } from "./npo-selector";

export const form_style = "w-full text-gray-d4 dark:text-white p-3";

interface Props extends ILoaderData {
  classes?: string;
}

export function Form({ classes = "", ...p }: Props) {
  const [search, set_search] = useSearchParams();
  const f = useFetcher<ILoaderData>();
  const nav = useNavigation();

  const init: FV = { tag: "", program: "" };
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useRemixForm<FV>({
    defaultValues: init,
    fetcher: f,
  });

  const { field: prog } = useController<FV, "program">({
    name: "program",
    control,
  });

  const q = f.formData?.get("q")?.toString() || search.get("q") || "";
  const opts =
    f.state === "loading"
      ? "loading"
      : q && !f.data?.npos?.opts.length
        ? `${q} not found`
        : (f.data?.npos?.opts ?? []);

  return (
    <f.Form
      method="PUT"
      onSubmit={handleSubmit}
      className={`${classes} ${form_style} grid gap-5 p-4`}
      autoComplete="off"
      autoSave="off"
    >
      {p.npos?.opts && (
        <HuiField>
          <Label data-required className="label font-semibold text-sm mb-1">
            Select nonprofit
          </Label>
          <NpoSelector
            q={q}
            on_q_change={(q) => f.submit({ q }, { method: "GET" })}
            value={p.npos.value}
            on_change={(opt) => {
              set_search((s) => {
                s.set("npo_id", opt.id.toString());
                return s;
              });
            }}
            is_loading={f.state === "loading" || nav.state === "loading"}
            opts={opts}
          />
        </HuiField>
      )}

      {p.programs.length > 0 && (
        <Select
          label="Select program"
          required={false}
          value={prog.value ?? ""}
          onChange={prog.onChange}
          options={p.programs.map((x) => x.id)}
          error={errors.program?.message}
          ref={prog.ref}
          classes={{
            option: "text-sm",
            container: "mb-4",
            label: "font-semibold",
          }}
          option_disp={(x) => p.programs.find((pr) => pr.id === x)?.title || ""}
        />
      )}

      <Field
        sub="A meaningful label to help you identify this form."
        {...register("tag")}
        label="Tag"
        placeholder="e.g. in mywebsite.com"
        required
        error={errors.tag?.message}
        classes={{ label: "font-semibold" }}
      />

      <button
        className="col-span-full btn btn-blue text-sm"
        disabled={f.state !== "idle" || nav.state !== "idle"}
        type="submit"
      >
        Submit
      </button>
    </f.Form>
  );
}
