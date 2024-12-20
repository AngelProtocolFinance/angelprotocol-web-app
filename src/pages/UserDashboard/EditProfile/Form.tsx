import CurrencySelector from "components/CurrencySelector";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { NativeField as Field, Label, Form as _Form } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useEditUserMutation } from "services/aws/users";
import { updateUserAttributes } from "slices/auth";
import { useSetter } from "store/accessors";
import type { UserAttributes } from "types/aws";
import type { Props } from "./types";
import { avatarSpec, useRhf } from "./useRhf";

export default function Form(props: Props) {
  const dispatch = useSetter();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const [editUser] = useEditUserMutation();

  const rhf = useRhf(props);

  return (
    <_Form
      disabled={rhf.isSubmitting}
      onReset={(e) => {
        e.preventDefault();
        rhf.reset();
      }}
      onSubmit={rhf.handleSubmit(async (fv) => {
        try {
          const update: Required<UserAttributes> = {
            givenName: fv.firstName,
            familyName: fv.lastName,
            prefCurrencyCode: fv.prefCurrency.code,
            avatarUrl: fv.avatar,
          };
          const updated = await editUser({
            ...cleanObject(update),
            userEmail: props.user.email,
          }).unwrap();
          showModal(Prompt, {
            type: "success",
            children: "Sucessfully updated!",
          });
          dispatch(updateUserAttributes(updated));
        } catch (err) {
          handleError(err, { context: "updating settings" });
        }
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
        currencies={props.currencies}
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
    </_Form>
  );
}
