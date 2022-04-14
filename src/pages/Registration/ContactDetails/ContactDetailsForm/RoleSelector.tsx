import { Control, UseFormRegister } from "react-hook-form";
import FormInput from "components/FormInput";
import Selector from "components/Selector";
import { OptionType } from "../../constants";
import { ContactDetails } from "./types";

type Props = {
  label: string;
  name: keyof ContactDetails;
  options: OptionType[];
  control: Control<ContactDetails, object>;
  otherRoleErrorMessage: string | undefined;
  onChange: (value: string) => void;
  register: UseFormRegister<ContactDetails>;
  disabled: boolean;
};

export default function RoleSelector(props: Props) {
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
          label="Specify your role"
          placeholder="Specify your role"
          registerReturn={props.register("otherRole")}
          errorMessage={props.otherRoleErrorMessage}
          required
          disabled={props.disabled}
          className="mt-3"
        />
      )}
    </div>
  );
}
