import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import Icon from "components/Icon";
import Logo from "components/Logo";
import { humanize } from "helpers";
import { tokens } from "constants/tokens";

export default function Amounts() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<WithdrawValues>();
  const { fields } = useFieldArray<WithdrawValues>({ name: "amounts" });

  if (fields.length <= 0) {
    return (
      <div className="flex items-center gap-2 text-red-l1 mb-4">
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
            className={`relative grid grid-cols-[auto_1fr_auto] items-center gap-2 @md:gap-4 w-full p-4 ${
              errors?.amounts?.at && errors.amounts.at(i)?.value?.message
                ? "border-2 border-red dark:border-red-l2"
                : "border border-prim"
            } rounded`}
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className="flex items-center gap-3 h-full uppercase"
            >
              <Logo
                logo={{ src: tokens[field.tokenId].icon }}
                className="h-6 w-6 rounded-full"
              />
              {tokens[field.tokenId].symbol}
            </label>
            <input
              {...register(fieldName)}
              id={field.id}
              type="text"
              autoComplete="off"
              placeholder="0.00000"
              className="w-full outline-none bg-transparent"
            />
            <button
              type="button"
              className="text-xs text-gray-d1 dark:text-gray"
              onClick={() => {
                setValue(fieldName, field.balance, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              Bal. {humanize(+field.balance, 4)}
            </button>

            <ErrorMessage
              errors={errors}
              name={fieldName}
              as="span"
              className="text-right text-red dark:text-red-l2 text-xs absolute -bottom-5 right-2"
            />
          </div>
        );
      })}
    </>
  );
}
