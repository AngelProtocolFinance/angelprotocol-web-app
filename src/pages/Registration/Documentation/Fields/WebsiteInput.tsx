import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "@types-page/registration";
import { InputRow } from "../../common";

export default function WebsiteInput() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow htmlFor="website" label="Website of your organization" required>
      <input
        {...register("website", { setValueAs: transformUrl })}
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

const transformUrl = (website: string) => {
  if (!website) {
    return "";
  }
  return website.startsWith("http") ? website : `http://${website}`;
};
