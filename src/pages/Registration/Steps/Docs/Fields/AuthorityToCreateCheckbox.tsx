import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox/Checkbox";

export default function AuthorityToCreateCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const {
    application: {
      Registration: { OrganizationName },
    },
  } = useRegistrationQuery();

  return (
    <Checkbox
      error={errors.hasAuthority?.message}
      {...register("hasAuthority")}
      disabled={isSubmitting}
    >
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${OrganizationName} through Angel Protocol`}
      <span className="text-red-l1 ml-0.5">*</span>
    </Checkbox>
  );
}
