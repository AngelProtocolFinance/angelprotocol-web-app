import RichTextEditor, {
  EditorClasses,
} from "components/RichTextEditor/RichTextEditor";
import { ContactDetails } from "./types";

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
        editorClasses={editorClasses}
      />
    </div>
  );
}

const editorClasses: EditorClasses = {
  container: "text-white/80 p-3 rounded-md bg-white/10 shadow-inner",
  controlContainer: "flex gap-2 mt-2 mb-4",
  control: "p-1.5 bg-angel-blue rounded-sm hover:bg-blue-accent shadow-md",
  error: "text-sm text-failed-red ml-1",
};
