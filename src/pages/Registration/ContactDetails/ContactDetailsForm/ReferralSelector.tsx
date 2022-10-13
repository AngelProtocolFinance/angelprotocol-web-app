import { useFormContext } from "react-hook-form";
import {
  ContactDetails as CD,
  ReferralOptionType,
} from "pages/Registration/types";
import FormInput from "../../common/FormInput";
import Selector from "../../common/Selector";

export default function ReferralSelector() {
  const { watch } = useFormContext<CD>();
  const method = watch("referralMethod");
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-dark-grey">
        How did you find out about us?
        <span className="text-red ml-0.5">*</span>
      </label>
      <Selector<CD>
        name="referralMethod"
        options={referralMethodOptions}
        classes={{ option: "px-3 py-2", button: "px-3 py-2" }}
      />
      {method === "other" && (
        <FormInput<CD>
          fieldName="otherReferralMethod"
          label="Please specify"
          placeholder="Please specify"
          required
          classes="mt-3"
        />
      )}
    </div>
  );
}

export const referralMethodOptions: ReferralOptionType[] = [
  { label: "Angel Alliance", value: "angel-alliance" },
  { label: "Discord", value: "discord" },
  { label: "Facebook", value: "facebook" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Medium", value: "medium" },
  { label: "Press", value: "press" },
  { label: "Search Engines", value: "search-engines" },
  { label: "Twitter", value: "twitter" },
  { label: "Other", value: "other" },
];
