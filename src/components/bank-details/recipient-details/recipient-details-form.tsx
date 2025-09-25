import { ErrorMessage } from "@hookform/error-message";
import {
  FileDropzone,
  type FileOutput,
  fileOutput,
} from "components/file-dropzone";
import { Form, Label } from "components/form";
import { type IPrompt, Prompt } from "components/prompt";
import { Select } from "components/selector/select";
import { error_prompt } from "helpers/error-prompt";
import { useState } from "react";
import { Controller, get, useController, useForm } from "react-hook-form";
import type {
  CreateRecipientRequest,
  Group,
  V1RecipientAccount,
  ValidationContent,
} from "types/bank-details";
import { safeParse } from "valibot";
import type { IFormButtons, OnSubmit } from "../types";
import { use_requirements } from "./use-requirements";

type Props = {
  fields: Group[];
  currency: string;
  amount: number;
  type: string;
  quoteId: string;
  disabled?: boolean;
  FormButtons: IFormButtons;
  onSubmit: OnSubmit;
  verified?: boolean;
};

interface FV extends Record<string, any> {
  bankStatement: FileOutput;
}

export function RecipientDetailsForm({
  fields,
  currency,
  type,
  quoteId,
  amount,
  disabled,
  onSubmit,
  FormButtons,
  verified,
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

  const [prompt, set_prompt] = useState<IPrompt>();
  const { update_requirements } = use_requirements(
    !amount ? null : { amount, currency }
  );

  const { field: bankStatement } = useController({
    control,
    name: "bankStatement",
    rules: {
      validate(value?: string) {
        const val = safeParse(fileOutput({ required: true }), value);
        return verified ? (val.issues?.[0].message ?? true) : true;
      },
    },
  });

  async function refresh() {
    const { accountHolderName, bankStatement: _, ...details } = getValues();
    // the following is expected to throw for example when the country code
    // is not yet set (all initial values are empty strings); the error is
    // logged in the browser console, but we can ignore it.
    await update_requirements({
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
      disabled={isSubmitting}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const { accountHolderName, bankStatement, ...details } = fv;

          const payload: CreateRecipientRequest = {
            accountHolderName,
            currency,
            ownedByCustomer: false,
            profile: "{{profileId}}",
            type,
            details,
          };

          const res = await fetch("/api/wise/v1/accounts", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "content-type": "application/json" },
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
            return set_prompt({
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
          const prmpt = error_prompt(err, { context: "validating" });
          set_prompt(prmpt);
        }
      })}
      className="grid gap-5 text-gray-d4"
    >
      {fields.map((f) => {
        const labelRequired = f.required ? true : undefined;
        if (f.type === "select") {
          return (
            <div key={f.key}>
              <Label required={labelRequired} htmlFor={f.key} className="mb-2">
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
                  <Select
                    aria-invalid={!!get(errors, name)?.message}
                    onChange={(value) => {
                      onChange(value);
                      if (f.refreshRequirementsOnChange) refresh();
                    }}
                    options={f.valuesAllowed?.map((x) => x.key) ?? []}
                    option_disp={(v) =>
                      f.valuesAllowed?.find((x) => x.key === v)?.name
                    }
                    ref={ref}
                    value={value}
                    classes={{ options: "text-sm" }}
                  />
                )}
              />
              <ErrorMessage
                name={f.key}
                errors={errors}
                as="p"
                className="text-red text-xs mt-1"
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
                    className={`relative border ${
                      !!getFieldState(f.key).error
                        ? "border-red"
                        : "border-gray-l3"
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
            <div key={f.key} className="">
              <Label required={labelRequired} htmlFor={f.key} className="mb-2">
                {f.name}
              </Label>
              <input
                className="field-input"
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
                          const res = await fetch(
                            `/api/wise/${path.slice(1)}?${params[0].key}=${v}`
                          );

                          return res.ok || "invalid";
                        } catch (err) {
                          console.error(err);
                          return "Validation of banking details failed unexpectedly";
                        }
                      }
                    : undefined,
                  //onBlur only as text input changes rapidly
                  onBlur: f.refreshRequirementsOnChange ? refresh : undefined,
                })}
              />
              <ErrorMessage
                as="p"
                className="text-red text-xs mt-1"
                errors={errors}
                name={f.key}
              />
            </div>
          );
        }

        if (f.type === "date") {
          return (
            <div key={f.key} className="">
              <Label required={labelRequired} htmlFor={f.key}>
                {f.name}
              </Label>
              <input
                className="field-input"
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
              <ErrorMessage
                as="p"
                className="text-red text-xs mt-1"
                errors={errors}
                name={f.key}
              />
            </div>
          );
        }

        return (
          <div className="bg-red" key={f.key}>
            {f.name}
          </div>
        );
      })}

      {verified && (
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
      )}

      <FormButtons
        disabled={disabled || bankStatement.value === "loading"}
        isSubmitting={isSubmitting}
      />
      {prompt && <Prompt {...prompt} onClose={() => set_prompt(undefined)} />}
    </Form>
  );
}
