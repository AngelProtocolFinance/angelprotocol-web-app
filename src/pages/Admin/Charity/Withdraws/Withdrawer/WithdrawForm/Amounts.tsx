import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FV } from "./types";
import Icon from "components/Icon";
import Image from "components/Image";
import { humanize } from "helpers";
import { tokens } from "constant/tokens";

type Props = {
  classes?: string;
  disabled?: boolean;
};
export default function Amounts({ classes = "", disabled = false }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FV>();
  const { fields } = useFieldArray<FV, "amounts">({ name: "amounts" });

  if (fields.length <= 0) {
    return (
      <div className={`flex items-center gap-2 text-red-l1 ${classes}`}>
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
            aria-disabled={disabled}
            className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 @md:gap-4 w-full p-4 border border-gray-l3 dark:border-bluegray rounded aria-disabled:bg-gray aria-disabled:dark:bg-bluegray-d1 aria-disabled:pointer-events-none"
            key={field.id}
          >
            <label
              htmlFor={field.id}
              className="flex items-center gap-3 h-full uppercase"
            >
              <Image
                src={tokens[field.tokenId].icon}
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
              className="w-full outline-none bg-transparent "
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
