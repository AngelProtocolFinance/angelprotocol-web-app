import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "@types-page/registration";
import Checkbox from "components/Checkbox/Checkbox";
import { useGetter } from "store/accessors";

export default function AuthorityToCreateCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  const charity = useGetter((state) => state.charity);

  return (
    <Checkbox
      error={errors.checkedAuthority?.message}
      {...register("checkedAuthority")}
      disabled={isSubmitting}
    >
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${charity.Registration.CharityName} through Angel Protocol`}
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  );
}
