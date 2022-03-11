import { useFormContext } from "react-hook-form";
import { InputRow } from "../common";
import { FormValues } from "./types";

export default function DescriptionInput() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="description"
      label="Description of your organization"
      required
    >
      <textarea
        id="description"
        rows={4}
        placeholder="Long text"
        className="min-h-10 rounded-md outline-none border-none w-full px-2 py-1 text-black"
        disabled={isSubmitting}
        {...register("description")}
      />
      {errors.description?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.description.message}
        </p>
      )}
    </InputRow>
  );
}
