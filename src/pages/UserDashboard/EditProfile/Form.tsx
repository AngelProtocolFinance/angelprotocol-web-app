import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import type { ImgLink } from "components/ImgEditor";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import Prompt from "components/Prompt";
import { NativeField as Field, Label, Form as _Form } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useController, useForm } from "react-hook-form";
import { genFileSchema } from "schemas/file";
import { schema } from "schemas/shape";
import type { SchemaShape } from "schemas/types";
import { useEditUserMutation } from "services/aws/users";
import { updateUserAttributes } from "slices/auth";
import { useSetter } from "store/accessors";
import type { AuthenticatedUser } from "types/auth";
import type { UserAttributes } from "types/aws";
import type { DetailedCurrency } from "types/components";
import type { ImageMIMEType } from "types/lists";
import { object, string } from "yup";
import type { FV } from "./types";

type Props = {
  currencies: DetailedCurrency[];
  defaultCurr?: DetailedCurrency;
  user: AuthenticatedUser;
};

export const AVATAR_MAX_SIZE_BYTES = 1e6;
export const AVATAR_MIME_TYPE: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const fileObj = object<any, SchemaShape<ImgLink>>({
  file: genFileSchema(AVATAR_MAX_SIZE_BYTES, AVATAR_MIME_TYPE),
});

export default function Form(props: Props) {
  const dispatch = useSetter();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const [editUser] = useEditUserMutation();

  const {
    register,
    control,
    reset,
    handleSubmit,
    resetField,
    trigger,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    resolver: yupResolver(
      schema<FV>({
        firstName: string().required("required"),
        lastName: string().required("required"),
        avatar: fileObj,
      })
    ),
    defaultValues: {
      prefCurrency: props.defaultCurr || { code: "usd", min: 1, rate: 1 },
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
      avatar: {
        name: "",
        preview: props.user.avatarUrl ?? "",
        publicUrl: props.user.avatarUrl ?? "",
      },
    },
  });

  console.log({ errors });

  const { field: prefCurrency } = useController<FV, "prefCurrency">({
    control,
    name: "prefCurrency",
  });

  const { field: avatar } = useController<FV, "avatar">({
    control,
    name: "avatar",
  });

  return (
    <_Form
      disabled={isSubmitting}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const update: Required<UserAttributes> = {
            givenName: fv.firstName,
            familyName: fv.lastName,
            prefCurrencyCode: fv.prefCurrency.code,
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
      className="w-full max-w-4xl justify-self-center grid content-start gap-6"
    >
      <Label className="-mb-4">Avatar</Label>
      <ImgEditor
        rounded
        value={avatar.value}
        onChange={(v) => {
          avatar.onChange(v);
          trigger("avatar.file");
        }}
        onUndo={(e) => {
          e.stopPropagation();
          resetField("avatar");
        }}
        accept={AVATAR_MIME_TYPE}
        aspect={[1, 1]}
        classes={{
          container: "mb-4",
          dropzone: "w-60 aspect-[1/1] rounded-full",
        }}
        maxSize={AVATAR_MAX_SIZE_BYTES}
        error={errors.avatar?.file?.message}
      />

      <CurrencySelector
        currencies={props.currencies}
        label="Default currency"
        onChange={prefCurrency.onChange}
        value={prefCurrency.value}
        classes={{ label: "text-sm" }}
        required
      />

      <Field
        {...register("firstName")}
        label="First name"
        placeholder="First name"
        classes="mt-8"
        required
        error={errors.firstName?.message}
      />

      <Field
        {...register("lastName")}
        label="Last name"
        placeholder="Last name"
        required
        error={errors.lastName?.message}
      />

      <div className="flex gap-3">
        <button
          type="reset"
          className="px-6 btn-outline-filled text-sm"
          disabled={!isDirty}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="px-6 btn-blue text-sm"
          disabled={!isDirty}
        >
          Submit changes
        </button>
      </div>
    </_Form>
  );
}
