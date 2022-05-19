import { useFormContext } from "react-hook-form";
import { ContactDetails } from "@types-page/registration";
import RichTextEditor from "components/RichTextEditor";

export default function GoalsInput() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<ContactDetails>();

  return (
    <div className="flex flex-col w-full text-left">
      <label htmlFor="goals">
        Goals
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <RichTextEditor<ContactDetails>
        name="goals"
        placeholder="What is your goal in working with Angel Protocol?"
        disabled={isSubmitting}
      />
      {errors.goals?.message && (
        <p className="text-sm text-failed-red">{errors.goals?.message}</p>
      )}
    </div>
  );
}
