import { useFormContext } from "react-hook-form";
import InputRow from "./InputRow";
import { FormValues } from "./types";

export default function WebsiteInput() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow id="website" label="Website of your organization" required>
      <input
        id="website"
        type="text"
        placeholder="Website URL"
        className="min-h-10 rounded-md outline-none border-none w-full px-2 py-1 text-black"
        disabled={isSubmitting}
        {...register("website")}
      />
      {errors.website?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.website.message}
        </p>
      )}
    </InputRow>
  );
}
