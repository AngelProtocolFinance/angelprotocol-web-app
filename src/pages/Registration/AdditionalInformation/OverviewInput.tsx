import { AdditionalInfoValues } from "../types";
import RichTextEditor from "components/RichTextEditor";

export default function OverviewInput() {
  return (
    <div className="flex flex-col w-full text-left">
      <label htmlFor="charityOverview" className="cursor-pointer">
        Description of your organization
        <span className="ml-0.5 text-failed-red">*</span>
      </label>
      <RichTextEditor<AdditionalInfoValues>
        fieldName="charityOverview"
        classes={{
          container: "text-white/80 p-3 rounded-md bg-white/10 shadow-inner",
          error: "text-sm text-failed-red ml-1",
        }}
        placeHolder="an overview of your organization"
      />
    </div>
  );
}
