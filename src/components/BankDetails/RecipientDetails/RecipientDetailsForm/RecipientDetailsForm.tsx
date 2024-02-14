import { ErrorMessage } from "@hookform/error-message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Label } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { useForm } from "react-hook-form";
import {
  useCreateRecipientMutation,
  useNewRequirementsMutation,
} from "services/aws/wise";
import { Group, ValidationContent } from "types/aws";
import { ApplicationMIMEType } from "types/lists";
import { IFormButtons, OnSubmit } from "../../types";
import Form from "./Form";

type Props = {
  fields: Group[];
  currency: string;
  amount: number;
  type: string;
  quoteId: string;
  disabled?: boolean;
  FormButtons: IFormButtons;
  onSubmit: OnSubmit;
};

export default function RecipientDetailsForm({
  fields,
  currency,
  type,
  quoteId,
  amount,
  disabled,
  onSubmit,
  FormButtons,
}: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
    getFieldState,
  } = useForm({ disabled, shouldUnregister: true });

  const { handleError } = useErrorContext();
  const [updateRequirements] = useNewRequirementsMutation();
  const [createRecipient] = useCreateRecipientMutation();

  async function refresh() {
    const { accountHolderName, bankStatement: _, ...details } = getValues();
    await updateRequirements({
      quoteId,
      amount,
      currency,
      request: {
        accountHolderName,
        currency,
        ownedByCustomer: false,
        profile: "{{profileId}}",
        type,
        details,
      },
    });
  }

  return (
    <Form
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const { accountHolderName, bankStatement, ...details } = fv;

          const res = await createRecipient({
            accountHolderName,
            currency,
            ownedByCustomer: false,
            profile: "{{profileId}}",
            type,
            details,
          });

          if ("data" in res) {
            const file = (bankStatement as FileList).item(0)!;
            return await onSubmit(res.data, file);
          }

          //ERROR handling
          const error = res.error as FetchBaseQueryError;
          if (error.status !== 422) return handleError(res.error);

          //only handle 422
          const content = error.data as ValidationContent;

          //filter "NOT_VALID"
          const _errs = content.errors;
          const validations = content.errors.filter(
            (err) => err.code === "NOT_VALID"
          );

          if (isEmpty(validations)) {
            return handleError(_errs[0].message || GENERIC_ERROR_MESSAGE);
          }

          //SET field errors
          for (const v of validations) {
            setError(v.path, { message: v.message });
          }

          setTimeout(() => {
            //focus 1st error only
            setFocus(validations[0].path);
            //wait a bit for `isSubmitting:false`, as disabled fields can't be focused
          }, 50);
        } catch (err) {
          handleError(err);
        }
      })}
      className="grid gap-5 text-gray-d2"
    >
      {fields.map((f) => {
        const labelRequired = f.required ? true : undefined;
        if (f.type === "select") {
          return (
            <div key={f.key} className="">
              <Label required={labelRequired} htmlFor={f.key} className="mb-1">
                {f.name}
              </Label>
              <select
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  onChange: f.refreshRequirementsOnChange ? refresh : undefined,
                })}
                aria-required={f.required}
                id={f.key}
                className="field-input"
              >
                {f.valuesAllowed?.map((v) => (
                  <option key={v.key} value={v.key}>
                    {v.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                errors={errors}
                name={f.key}
                as="p"
                className="text-red text-xs -mb-5"
              />
            </div>
          );
        }

        if (f.type === "radio") {
          return (
            <div key={f.key} className="grid gap-2">
              <div className="flex gap-3 items-center">
                <Label required={labelRequired}>{f.name}</Label>
                <ErrorMessage
                  errors={errors}
                  name={f.key}
                  as="p"
                  className="text-red text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                {f.valuesAllowed?.map((v) => (
                  <div
                    key={v.key}
                    className="relative border border-prim rounded px-4 py-3.5 text-sm has-[:checked]:border-orange has-[:disabled]:bg-gray-l5 w-32 h-10 focus-within:ring-1 focus-within:ring-gray-d1"
                  >
                    <input
                      className="appearance none w-0 h-0"
                      id={`radio__${v.key}`}
                      type="radio"
                      value={v.key}
                      {...register(f.key, {
                        required: f.required ? "required" : false,
                        onChange: f.refreshRequirementsOnChange
                          ? refresh
                          : undefined,
                      })}
                    />
                    <label
                      htmlFor={`radio__${v.key}`}
                      className="absolute inset-0 w-full grid place-items-center cursor-pointer"
                    >
                      {v.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (f.type === "text") {
          return (
            <div key={f.key} className="field">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <input
                aria-invalid={!!getFieldState(f.key).error}
                type="text"
                placeholder={f.example}
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  maxLength: f.maxLength
                    ? {
                        value: f.maxLength,
                        message: `max ${f.maxLength} chars`,
                      }
                    : undefined,
                  minLength: f.minLength
                    ? {
                        value: f.minLength,
                        message: `min ${f.minLength} chars`,
                      }
                    : undefined,
                  pattern: f.validationRegexp
                    ? {
                        value: new RegExp(f.validationRegexp),
                        message: "invalid",
                      }
                    : undefined,

                  validate: f.validationAsync
                    ? async (v: string) => {
                        const { params, url } = f.validationAsync!;
                        const res = await fetch(`${url}?${params[0].key}=${v}`);
                        return res.ok || "invalid";
                      }
                    : undefined,
                  //onBlur only as text input changes rapidly
                  onBlur: f.refreshRequirementsOnChange ? refresh : undefined,
                })}
              />
              <ErrorMessage as="p" data-error errors={errors} name={f.key} />
            </div>
          );
        }

        if (f.type === "date") {
          return (
            <div key={f.key} className="field">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <input
                aria-invalid={!!getFieldState(f.key).error}
                type="text"
                placeholder={f.example}
                {...register(f.key, {
                  required: f.required ? "required" : false,
                  pattern: f.validationRegexp
                    ? {
                        value: new RegExp(f.validationRegexp),
                        message: `format ${f.example}`,
                      }
                    : undefined,
                  onBlur: f.refreshRequirementsOnChange ? refresh : undefined,
                })}
              />
              <ErrorMessage as="p" data-error errors={errors} name={f.key} />
            </div>
          );
        }

        return (
          <div className="bg-red" key={f.key}>
            {f.name}
          </div>
        );
      })}

      <div className="grid gap-1">
        <Label htmlFor="bank__statement" required>
          Bank statement
        </Label>
        <input
          id="bank__statement"
          type="file"
          className="disabled:bg-gray-l5 text-sm rounded w-full border border-prim file:border-none file:border-r file:border-prim file:py-3 file:px-4 file:bg-blue-l4 file:text-gray-d2 text-gray-d1"
          {...register("bankStatement", {
            validate(value?: FileList) {
              //multile:false
              const file = value?.item(0);
              //required: is already handled
              if (!file) return "required";

              const VALID_TYPE: ApplicationMIMEType = "application/pdf";
              if (file.type !== VALID_TYPE) {
                return "must be PDF file";
              }

              const MB_LIMIT = 6;
              if (file.size >= Math.pow(10, MB_LIMIT)) {
                return `exceeds ${MB_LIMIT}MB`;
              }

              return true;
            },
          })}
        />

        <ErrorMessage
          errors={errors}
          name="bankStatement"
          as="p"
          className="text-red text-xs justify-self-end -mb-5"
        />
      </div>

      <FormButtons disabled={disabled} isSubmitting={isSubmitting} />
    </Form>
  );
}
