import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
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
      <ErrorMessage
        as="p"
        name="website"
        errors={errors}
        className="w-full text-xs text-red text-center"
      />
    </InputRow>
  );
}

const transformUrl = (website: string) => {
  if (!website) {
    return "";
  }
  return website.startsWith("http") ? website : `http://${website}`;
};
