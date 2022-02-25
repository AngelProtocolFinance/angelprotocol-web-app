import Checkbox from "components/Checkbox";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";

type Props = { charityName: string };

const AuthorityToCreateCheckbox = ({ charityName }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Checkbox
      error={errors?.checkedAuthority?.message}
      {...register("checkedAuthority")}
    >
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${charityName} through Angel Protocol`}
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  );
};

export default AuthorityToCreateCheckbox;
