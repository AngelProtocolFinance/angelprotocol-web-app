import { useFetcher, useLoaderData } from "@remix-run/react";
import CurrencySelector from "components/CurrencySelector";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import { NativeField as Field, Form, Label } from "components/form";
import { useActionResult } from "hooks/use-action-result";
import type { ActionData } from "types/action";
import type { LoaderData } from "./api";
import { avatarSpec, useRhf } from "./useRhf";
export default function Component() {
  const data = useLoaderData() as LoaderData;
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
      className="w-full max-w-4xl justify-self-center content-start"
    >
      <h2 className="text-3xl mb-6">User Profile</h2>

      <Label className="text-base font-medium mb-2">Avatar</Label>
      <ImgEditor
        bucket="bg-user"
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
          dropzone: "w-60 aspect-[1/1] rounded-full",
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
          className="px-6 btn-outline-filled text-sm"
          disabled={!rhf.isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn-blue text-sm"
          disabled={!rhf.isDirty}
        >
          Submit changes
        </button>
      </div>
    </Form>
  );
}
