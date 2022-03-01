import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import InputRow from "./InputRow";

export default function WebsiteInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow id="charityWebsite" label="Website of your organization" required>
      <input
        id="charityWebsite"
        type="text"
        placeholder="Website URL"
        className="h-8 rounded-md outline-none border-none w-full px-2 py-1 text-black"
        {...register("charityWebsite")}
      />
      {errors.charityWebsite?.message && (
        <p className="w-full text-xs text-failed-red text-center">
          {errors.charityWebsite.message}
        </p>
      )}
    </InputRow>
  );
}
