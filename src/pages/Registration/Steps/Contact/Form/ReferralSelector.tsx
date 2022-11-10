import { FormValues as FV } from "../types";
import { ReferralOptionType } from "pages/Registration/types";
import Selector from "../../../common/Selector";

export default function ReferralSelector() {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-dark-grey">
        How did you find out about us?
        <span className="text-red ml-0.5">*</span>
      </label>
      <Selector<FV>
        name="referralMethod"
        options={referralMethodOptions}
        classes={{ option: "px-3 py-2", button: "px-3 py-2" }}
      />
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
