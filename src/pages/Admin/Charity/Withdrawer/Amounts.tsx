import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { humanize } from "helpers";
import { coinAsset } from "constants/currency";

export default function Amounts() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();
  const { fields } = useFieldArray<WithdrawValues>({ name: "amounts" });

  return (
    <>
      {fields.map((field, i) => {
        const fieldName = `amounts.${i}.value` as const;
        return (
          <div
            className="flex relative mb-8 border-b border-zinc-900/10 pr-2 pb-1 pt-6 items-center"
            key={field.id}
          >
            <button
              onClick={() => {
                setValue(fieldName, field.balance, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              type="button"
              className="absolute top-1 right-2 text-sky-400 uppercase text-xs"
            >
              bal: {humanize(+field.balance, 4)}
            </button>
            <img
              src={coinAsset[field.tokenId].icon}
              alt=""
              className="h-5 w-5 object-contain mr-1"
            />
            <label
              htmlFor={field.id}
              className="uppercase font-heading text-sm"
            >
              {coinAsset[field.tokenId].name}
            </label>
            <input
              {...register(fieldName)}
              id={field.id}
              type="text"
              autoComplete="off"
              placeholder="0.000000"
              className="bg-transparent text-right w-full outline-none text-angel-grey font-mono text-xl"
            />
            <ErrorMessage
              errors={errors}
              name={fieldName}
              as="span"
              className="text-right text-rose-400 text-xs absolute -bottom-5 right-2"
            />
          </div>
        );
      })}
    </>
  );
}
