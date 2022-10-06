import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import { useRegistrationQuery } from "services/aws/registration";
import Checkbox from "components/Checkbox/Checkbox";

export default function AuthorityToCreateCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  const {
    application: {
      Registration: { OrganizationName },
    },
  } = useRegistrationQuery();

  return (
    <Checkbox
      error={errors.checkedAuthority?.message}
      {...register("checkedAuthority")}
      disabled={isSubmitting}
    >
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${OrganizationName} through Angel Protocol`}
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  );
}
