import { ErrorMessage } from "@hookform/error-message";
import { Path, useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { errorStyle } from "components/KYC/Form/TextInput";
import { textFieldStyle } from "components/gift";

export default function Recipient({ classes = "" }: { classes?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<DonateValues>();
  const fieldName: Path<DonateValues> = "recipient";
  return (
    <div className={`grid ${classes}`}>
      <label htmlFor={fieldName} className="font-bold font-heading mb-3">
        Enter recipient address:{" "}
      </label>
      <input
        {...register(fieldName)}
        id={fieldName}
        type="text"
        className={textFieldStyle}
        placeholder="e.g. juno123abc8910xyz.."
        autoComplete="off"
      />
      <ErrorMessage
        as="p"
        errors={errors}
        name={fieldName}
        className={errorStyle}
      />
    </div>
  );
}
