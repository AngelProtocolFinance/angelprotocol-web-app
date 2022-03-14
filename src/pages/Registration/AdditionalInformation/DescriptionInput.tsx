import RichTextEditor from "components/RichTextEditor";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";

export default function DescriptionInput() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <div className="flex flex-col w-full text-left">
      <label htmlFor="charityOverview" className="cursor-pointer">
        Description of your organization
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <RichTextEditor
        name="charityOverview"
        placeholder="Long text"
        disabled={isSubmitting}
      />
      {errors.charityOverview?.message && (
        <p className="text-sm text-failed-red">
          {errors.charityOverview?.message}
        </p>
      )}
    </div>
  );
}
