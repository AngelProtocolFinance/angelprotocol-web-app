import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { assets } from "../constants";

export default function Amounts() {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithdrawValues>();
  const { fields } = useFieldArray<WithdrawValues>({ name: "amounts" });

  console.log(fields);

  return (
    <>
      {fields.map((field, i) => {
        const id = `amounts.${i}.tokenId` as const;
        return (
          <div className="grid my-2 p-3 pb-1" key={field.id}>
            <label
              htmlFor={id}
              className="text-angel-grey font-bold font-heading text-sm uppercase mb-2"
            >
              {assets[field.tokenId].name}
            </label>
            <input
              {...register(`amounts.${i}.value`)}
              id={id}
              type="text"
              autoComplete="off"
              className="p-1 pl-0 w-full outline-none text-angel-grey font-mono text-sm"
            />
            <ErrorMessage
              errors={errors}
              name={`amounts.${i}.value`}
              as="span"
              className="font-mono font-semibold text-right text-red-400 text-xs m-1"
            />
          </div>
        );
      })}
    </>
  );
}
