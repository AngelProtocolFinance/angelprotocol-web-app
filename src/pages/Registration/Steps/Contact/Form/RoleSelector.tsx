import { FormValues as FV } from "../types";
import { OptionType } from "pages/Registration/types";
import Selector from "../../../common/Selector";

//TODO: convert to combobox for custom values
export default function RoleSelector() {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-dark-grey">
        What's your role within the organization?
        <span className="text-red ml-0.5">*</span>
      </label>
      <Selector<FV>
        name="role"
        options={contactRoleOptions}
        classes={{ option: "px-3 py-2", button: "px-3 py-2" }}
      />
    </div>
  );
}

const contactRoleOptions: OptionType[] = [
  { label: "Chairperson / President", value: "president" },
  {
    label: "Vice-chairperson / Vice president",
    value: "vice-president",
  },
  { label: "Secretary", value: "secretary" },
  { label: "Treasurer", value: "treasurer" },
  { label: "CEO", value: "ceo" },
  { label: "CFO", value: "cfo" },
  { label: "Board Member", value: "board-member" },
  { label: "Leadership Team", value: "leadership-team" },
  { label: "Fundraising / Finance", value: "fundraising-finance" },
  { label: "Legal", value: "legal" },
  { label: "Communications", value: "communications" },
  { label: "Other", value: "other" },
];
