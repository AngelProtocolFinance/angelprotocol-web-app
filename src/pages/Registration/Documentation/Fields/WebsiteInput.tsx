import { useFormContext } from "react-hook-form";
import { InputRow } from "../../common";
import { FormValues } from "../types";

export default function WebsiteInput() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow htmlFor="website" label="Website of your organization" required>
      <input
        {...register("website", {
          setValueAs: (website: string) =>
            website.startsWith("http") ? website : `http://${website}`,
        })}
        id="website"
        placeholder="Website URL"
        className="h-8 rounded-md outline-none border-none w-full px-2 py-1 text-black"
        disabled={isSubmitting}
      />
      {errors.website?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.website.message}
        </p>
      )}
    </InputRow>
  );
}
