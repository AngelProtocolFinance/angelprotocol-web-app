import { useFetcher } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { CurrencySelector } from "components/currency-selector";
import { Field, Form, Label } from "components/form";
import { ControlledImgEditor as ImgEditor } from "components/img-editor";
import { useActionResult } from "hooks/use-action-result";
import type { ActionData } from "types/action";
import type { LoaderData } from "./api";
import { avatarSpec, useRhf } from "./use-rhf";

export default function Component() {
  const data = useCachedLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();
  useActionResult(fetcher.data);
  const rhf = useRhf(data);

  return (
    <Form
      disabled={fetcher.state === "submitting"}
      onReset={(e) => {
        e.preventDefault();
        rhf.reset();
      }}
      onSubmit={rhf.handleSubmit(async (fv) => {
        const { df } = rhf;
        const attributes: object[] = [];

        if (df.firstName) {
          attributes.push({ Name: "given_name", Value: fv.firstName });
        }
        if (df.lastName) {
          attributes.push({ Name: "family_name", Value: fv.lastName });
        }
        if (df.prefCurrency) {
          attributes.push({
            Name: "custom:currency",
            Value: fv.prefCurrency.code,
          });
        }
        if (df.avatar) {
          attributes.push({ Name: "custom:avatar", Value: fv.avatar });
        }

        fetcher.submit(attributes as any, {
          encType: "application/json",
          action: ".",
          method: "PATCH",
        });
      })}
      className="w-full max-w-4xl content-start"
    >
      <h2 className="text-3xl mb-6">User Profile</h2>

      <Label className="text-base font-medium mb-2">Avatar</Label>
      <ImgEditor
        spec={avatarSpec}
        value={rhf.avatar.value}
        onChange={(v) => {
          rhf.avatar.onChange(v);
          rhf.trigger("avatar");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          rhf.resetField("avatar");
        }}
        classes={{
          container: "mb-4",
          dropzone: "w-60 aspect-1/1 rounded-full",
        }}
        error={rhf.errors.avatar?.message}
      />

      <CurrencySelector
        currencies={data.all}
        label="Default currency"
        onChange={rhf.prefCurrency.onChange}
        value={rhf.prefCurrency.value}
        classes={{ label: "font-medium text-base", container: "mt-16" }}
        required
      />

      <Field
        {...rhf.register("firstName")}
        label="First name"
        placeholder="First name"
        classes={{ container: "mt-16", label: "text-base font-medium" }}
        required
        error={rhf.errors.firstName?.message}
      />

      <Field
        {...rhf.register("lastName")}
        label="Last name"
        placeholder="Last name"
        required
        classes={{ container: "mt-4", label: "text-base font-medium" }}
        error={rhf.errors.lastName?.message}
      />

      <div className="flex gap-3 mt-8">
        <button
          type="reset"
          className="px-6 btn-outline btn text-sm"
          disabled={!rhf.isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn btn-blue text-sm"
          disabled={!rhf.isDirty || rhf.avatar.value === "loading"}
        >
          Submit changes
        </button>
      </div>
    </Form>
  );
}
