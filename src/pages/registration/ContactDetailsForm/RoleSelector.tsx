import { Selector } from "components/Selector";
import { Control, UseFormRegister } from "react-hook-form";
import { OptionType, UserRoles } from "../constants";
import Input from "./Input";
import { ContactDetails } from "./types";

type Props = {
  label: string;
  name: string;
  options: OptionType[];
  control: Control<ContactDetails, object>;
  otherRoleErrorMessage: string | undefined;
  onChange: (value: string) => void;
  register: UseFormRegister<ContactDetails>;
  disabled: boolean;
};

export default function RoleSelector(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={props.name} className="text-dark-grey">
          {props.label}
          <span className="text-failed-red ml-0.5">*</span>
        </label>
        <Selector
          name={props.name}
          options={props.options}
          control={props.control}
          register={props.register}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
      {props.control._formValues[props.name] === UserRoles.other && (
        <Input
          label="Specify your role"
          placeholder="Specify your role"
          registerReturn={props.register("otherRole")}
          errorMessage={props.otherRoleErrorMessage}
          required
          disabled={props.disabled}
        />
      )}
    </div>
  );
}
