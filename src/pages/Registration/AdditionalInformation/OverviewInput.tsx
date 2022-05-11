import RichTextEditor, {
  EditorClasses,
} from "components/RichTextEditor/RichTextEditor";
import { FormValues } from "./types";

export default function OverviewInput() {
  return (
    <div className="flex flex-col w-full text-left">
      <label htmlFor="charityOverview" className="cursor-pointer">
        Description of your organization
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <RichTextEditor<FormValues>
        fieldName="charityOverview"
        editorClasses={editorClasses}
      />
    </div>
  );
}

const editorClasses: EditorClasses = {
  container: "text-white/80 p-3 rounded-md bg-white/10 shadow-inner",
  controlContainer: "flex gap-2 mt-2 mb-4",
  control: "p-1.5 bg-angel-blue rounded-sm hover:bg-blue-accent shadow-md",
  error: "text-sm text-failed-red",
};
