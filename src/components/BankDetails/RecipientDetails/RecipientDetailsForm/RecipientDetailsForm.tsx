import { ErrorMessage } from "@hookform/error-message";
import { wise } from "api/api";
import {
  FileDropzone,
  type FileOutput,
  fileOutput,
} from "components/FileDropzone";
import { type IPromptV2, PromptV2 } from "components/Prompt";
import { NativeSelect } from "components/Selector";
import { Label } from "components/form";
import { errorPrompt } from "contexts/ErrorContext";
import { logger } from "helpers";
import { useState } from "react";
import { Controller, get, useController, useForm } from "react-hook-form";
import type { Group, V1RecipientAccount, ValidationContent } from "types/aws";
import { safeParse } from "valibot";
import type { IFormButtons, OnSubmit } from "../../types";
import { useRequirements } from "../use-requirements";
import Form from "./Form";
import { createRecipient } from "./create-recipient";

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

interface FV extends Record<string, any> {
  bankStatement: FileOutput;
}

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
  } = useForm<FV>({ disabled, shouldUnregister: true });

  const [prompt, setPrompt] = useState<IPromptV2>();
  const { updateRequirements } = useRequirements(
    !amount ? null : { amount, currency }
  );

  const { field: bankStatement } = useController({
    control,
    name: "bankStatement",
    rules: {
      validate(value?: string) {
        const val = safeParse(fileOutput({ required: true }), value);
        return val.issues?.[0].message ?? true;
      },
    },
  });

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

          if (res.ok) {
            const data: V1RecipientAccount = await res.json();
            return await onSubmit(data, bankStatement);
          }

          //ERROR handling
          if (res.status !== 422) throw res;

          //only handle 422
          const content: ValidationContent = await res.json();

          //filter "NOT_VALID"
          const _errs = content.errors;
          const validations = _errs.filter((err) => err.code === "NOT_VALID");

          if (validations.length === 0) {
            return setPrompt({
              type: "error",
              children: _errs[0].message,
            });
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
          const prmpt = errorPrompt(err, { context: "validating" });
          setPrompt(prmpt);
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
                    } rounded px-4 py-3.5 text-sm has-checked:border-blue-d1 has-disabled:bg-gray-l5 w-32 h-10 focus-within:ring-1 focus-within:ring-blue-l2`}
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
                          const path = new URL(url).pathname;
                          const res = await wise.get(path, {
                            throwHttpErrors: false,
                            searchParams: { [params[0].key]: v },
                          });

                          return res.ok || "invalid";
                        } catch (err) {
                          logger.error(err);
                          return "Validation of banking details failed unexpectedly";
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

      <FileDropzone
        label={
          <Label htmlFor="bank__statement" required className="mb-2">
            Bank statement
          </Label>
        }
        specs={{ mbLimit: 6, mimeTypes: ["application/pdf"] }}
        disabled={disabled}
        ref={bankStatement.ref}
        value={bankStatement.value}
        onChange={bankStatement.onChange}
        error={errors.bankStatement?.message?.toString()}
      />

      <FormButtons
        disabled={disabled || bankStatement.value === "loading"}
        isSubmitting={isSubmitting}
      />
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </Form>
  );
}
