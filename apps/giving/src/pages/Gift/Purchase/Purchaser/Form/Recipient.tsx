import { ErrorMessage } from "@hookform/error-message";
import { Path, useFormContext } from "react-hook-form";
import { FormValues } from "../types";

export default function Recipient({ classes = "" }: { classes?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  const fieldName: Path<FormValues> = "recipient";
  return (
    <div className={`grid field field-gift ${classes}`}>
      <label htmlFor={fieldName} className="font-bold font-heading mb-3">
        Enter recipient address:{" "}
        <p className="text-sm font-normal text-gray-d1 dark:text-gray font-work w-[90%] mt-1">
          You may leave this blank and receive a gift card code - which you can
          send to your recipient.
        </p>
      </label>
      <input
        {...register(fieldName)}
        id={fieldName}
        type="text"
        className="font-work"
        placeholder="e.g. juno123abc8910xyz.."
        autoComplete="off"
      />
      <ErrorMessage data-error as="p" errors={errors} name={fieldName} />
    </div>
  );
}
