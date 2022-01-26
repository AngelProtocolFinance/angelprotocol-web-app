import { Selector } from "components/Selector";
import { Control, UseFormRegister } from "react-hook-form";
import Input from "./Input";
import { ContactDetails } from "./useContactDetails";
import { userRoles } from "../../constants/userRoles";

type Props = {
  label: string;
  name: string;
  control: Control<ContactDetails, object>;
  onChange: (value: string) => void;
  errorMessage: string | undefined;
  otherRoleErrorMessage: string | undefined;
  register: UseFormRegister<ContactDetails>;
};

export default function RoleSelector(props: Props) {
  const {
    label,
    name,
    control,
    onChange,
    register,
    errorMessage,
    otherRoleErrorMessage,
  } = props;

  return (
    <>
      <div className="items-center justify-center mb-4">
        <div className="text-left">
          <span className="text-base text-left">
            {label}
            <span className="text-base text-failed-red">*</span>
          </span>
        </div>
        <div className="">
          <div className="mr-5 rounded-md bg-white flex items-center text-black">
            <Selector
              name={name}
              placeholder="Role"
              options={userRoles}
              control={control}
              register={register}
              onChange={onChange}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-failed-red">{errorMessage}</p>
          )}
        </div>
      </div>
      {control._formValues[name] === "other" && (
        <Input
          label="Specify your role"
          placeholder="Specify your role"
          registerReturn={register("otherRole")}
          errorMessage={otherRoleErrorMessage}
          required
        />
      )}
    </>
  );
}
