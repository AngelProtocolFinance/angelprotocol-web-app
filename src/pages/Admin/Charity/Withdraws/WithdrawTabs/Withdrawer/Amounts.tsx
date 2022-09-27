import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import Icon from "components/Icon";
import { humanize } from "helpers";
import { coinAsset } from "constants/currency";

export default function Amounts() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();
  const { fields } = useFieldArray<WithdrawValues>({ name: "amounts" });

  if (fields.length <= 0) {
    return (
      <div className="flex items-center gap-2 text-rose-400 mb-4">
        <Icon type="Info" />
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <>
      {fields.map((field, i) => {
        const fieldName = `amounts.${i}.value` as const;

        return (
          <div
            className="flex relative mb-6 border-b border-black/10 pr-2 pb-1 pt-6 items-center"
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
              className="absolute top-1 right-2 text-blue-l1 uppercase text-xs"
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
              className="bg-transparent text-right w-full outline-none text-gray-d2 font-mono text-xl"
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
