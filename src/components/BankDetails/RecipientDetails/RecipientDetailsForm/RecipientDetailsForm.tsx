import { ErrorMessage } from "@hookform/error-message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NativeSelect } from "components/Selector";
import { Label } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty, logger } from "helpers";
import { Controller, get, useForm } from "react-hook-form";
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
    control,
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
    // the following is expected to throw for example when the country code
    // is not yet set (all initial values are empty strings); the error is
    // logged in the browser console, but we can ignore it.
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
      className="grid gap-5 text-navy-d4"
    >
      {fields.map((f) => {
        const labelRequired = f.required ? true : undefined;
        if (f.type === "select") {
          return (
            <div key={f.key} className="field">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <Controller
                control={control}
                defaultValue=""
                name={f.key}
                rules={{
                  required: f.required ? "required" : false,
                }}
                render={({ field: { name, value, onChange, ref } }) => (
                  <>
                    <NativeSelect
                      aria-invalid={!!get(errors, name)?.message}
                      id={name}
                      onChange={(value) => {
                        onChange(value);
                        if (f.refreshRequirementsOnChange) refresh();
                      }}
                      options={f.valuesAllowed?.map((v) => ({
                        label: v.name,
                        value: v.key,
                      }))}
                      ref={ref}
                      value={value}
                      classes={{ options: "text-sm" }}
                    />
                  </>
                )}
              />
              <ErrorMessage name={f.key} errors={errors} as="p" data-error />
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
                    className={`relative border ${
                      !!getFieldState(f.key).error
                        ? "border-red"
                        : "border-gray-l4"
                    } rounded px-4 py-3.5 text-sm has-[:checked]:border-blue-d1 has-[:disabled]:bg-gray-l5 w-32 h-10 focus-within:ring-1 focus-within:ring-blue-l2`}
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
                        try {
                          const { params, url } = f.validationAsync!;
                          const res = await fetch(
                            `${url}?${params[0].key}=${v}`
                          );
                          return res.ok || "invalid";
                        } catch (err) {
                          logger.error(err);
                          return "validation failed";
                        }
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

      <div className="field">
        <Label htmlFor="bank__statement" required>
          Bank statement
        </Label>
        <input
          aria-invalid={!!getFieldState("bankStatement").error}
          id="bank__statement"
          type="file"
          // `!py-0 !pl-0` removes padding added by `field > field-input`
          className="!py-0 !pl-0 file:border-none file:border-r file:border-gray-l4 file:py-3.5 file:px-4 file:bg-blue-l4 file:text-navy-d4 text-navy-l1"
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

        <ErrorMessage as="p" data-error errors={errors} name="bankStatement" />
      </div>

      <FormButtons disabled={disabled} isSubmitting={isSubmitting} />
    </Form>
  );
}
