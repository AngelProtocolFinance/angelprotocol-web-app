import { ContactDetails } from "pages/Registration/types";
import RichTextEditor from "components/RichTextEditor";

export default function GoalsInput() {
  return (
    <div className="flex flex-col w-full text-left">
      <label htmlFor="goals">
        Goals
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <RichTextEditor<ContactDetails>
        fieldName="goals"
        placeHolder="What is your goal in working with Angel Protocol?"
        classes={{
          container: "text-white/80 p-3 rounded-md bg-white/10 shadow-inner",
          error: "text-sm text-failed-red ml-1",
        }}
      />
    </div>
  );
}
