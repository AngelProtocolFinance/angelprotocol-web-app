import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import Prompt from "components/Prompt";
import { Field, Form as FormWithContext } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { cleanObject } from "helpers/cleanObject";
import { useController, useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import { useEditUserMutation } from "services/aws/users";
import type { AuthenticatedUser } from "types/auth";
import type { UserAttributes } from "types/aws";
import type { DetailedCurrency } from "types/components";
import { string } from "yup";
import type { FV } from "./types";

type Props = {
  currencies: DetailedCurrency[];
  defaultCurr?: DetailedCurrency;
  user: AuthenticatedUser;
};

export default function Form(props: Props) {
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const [editUser] = useEditUserMutation();

  const methods = useForm({
    resolver: yupResolver(
      schema<FV>({
        firstName: string().required("required"),
        lastName: string().required("required"),
      })
    ),
    defaultValues: {
      prefCurrency: props.defaultCurr || { code: "usd", min: 1, rate: 1 },
      firstName: props.user.firstName ?? "",
      lastName: props.user.lastName ?? "",
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const {
    field: { value: prefCurrency, onChange: onPrefCurrencyChange },
  } = useController<FV, "prefCurrency">({
    control,
    name: "prefCurrency",
  });

  return (
    <FormWithContext
      disabled={isSubmitting}
      methods={methods}
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
          await editUser({
            ...cleanObject(update),
            userEmail: props.user.email,
          }).unwrap();
          showModal(Prompt, {
            type: "success",
            children: "Sucessfully updated!",
          });
          await new Promise((r) => setTimeout(r, 200));
          //reloads session (fetches user attributes)
          window.location.reload();
        } catch (err) {
          handleError(err, { context: "updating settings" });
        }
      })}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6"
    >
      <CurrencySelector
        currencies={props.currencies}
        label="Default currency"
        onChange={onPrefCurrencyChange}
        value={prefCurrency}
        classes={{ label: "text-sm" }}
        required
      />

      <Field<FV>
        name="firstName"
        label="First name"
        placeholder="First name"
        classes="mt-8"
      />

      <Field<FV> name="lastName" label="Last name" placeholder="Last name" />

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
    </FormWithContext>
  );
}
