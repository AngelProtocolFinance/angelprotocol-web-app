import { useFormContext } from "react-hook-form";
import { ContactDetails as CD, OptionType } from "pages/Registration/types";
import FormInput from "../../common/FormInput";
import Selector from "../../common/Selector";

export default function RoleSelector() {
  const { watch } = useFormContext<CD>();

  const role = watch("role");

  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-dark-grey">
        What's your role within the organization?
        <span className="text-red ml-0.5">*</span>
      </label>
      <Selector<CD> name="role" options={contactRoleOptions} />
      {role === "other" && (
        <FormInput<CD>
          fieldName="otherRole"
          label="Specify your role"
          placeholder="Specify your role"
          required
          classes={{ container: "mt-3" }}
        />
      )}
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
