import Checkbox from "components/Checkbox";
import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { FormValues } from "../types";

export default function AuthorityToCreateCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  const user = useGetter((state) => state.user);

  return (
    <Checkbox
      error={errors.checkedAuthority?.message}
      {...register("checkedAuthority")}
      disabled={isSubmitting}
    >
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${user.Registration.CharityName} through Angel Protocol`}
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  );
}
