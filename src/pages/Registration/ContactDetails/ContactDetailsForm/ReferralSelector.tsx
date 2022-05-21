import { Control, UseFormRegister } from "react-hook-form";
import { ContactDetails, ReferralOptionType } from "pages/Registration/types";
import FormInput from "components/FormInput";
import Selector from "components/Selector";

type Props = {
  label: string;
  name: keyof ContactDetails;
  options: ReferralOptionType[];
  control: Control<ContactDetails, object>;
  otherReferralMethodErrorMessage: string | undefined;
  onChange: (value: string) => void;
  register: UseFormRegister<ContactDetails>;
  disabled: boolean;
};

export default function ReferralSelector(props: Props) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label htmlFor={props.name} className="text-dark-grey">
        {props.label}
        <span className="text-failed-red ml-0.5">*</span>
      </label>
      <Selector<ContactDetails>
        name={props.name}
        options={props.options}
        control={props.control}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.control._formValues[props.name] === "other" && (
        <FormInput
          label="Please specify"
          placeholder="Please specify"
          registerReturn={props.register("otherReferralMethod")}
          errorMessage={props.otherReferralMethodErrorMessage}
          required
          disabled={props.disabled}
          className="mt-3"
        />
      )}
    </div>
  );
}
