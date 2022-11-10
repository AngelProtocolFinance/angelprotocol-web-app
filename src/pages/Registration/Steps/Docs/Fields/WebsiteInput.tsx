import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { ErrorMessage, InputRow } from "../../../common";

export default function WebsiteInput() {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow htmlFor="website" label="Website of your organization" required>
      <input
        {...register("website", { setValueAs: transformUrl })}
        id="website"
        placeholder="Website URL"
        className="text-sm rounded-md outline-none border-none w-full px-2 py-1 text-black"
        disabled={isSubmitting}
      />
      <ErrorMessage<FormValues> name="website" />
    </InputRow>
  );
}

const transformUrl = (website: string) => {
  if (!website) {
    return "";
  }
  return website.startsWith("http") ? website : `http://${website}`;
};
