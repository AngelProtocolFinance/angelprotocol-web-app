import { useFormContext } from "react-hook-form";
import Checkbox from "components/Checkbox";
import { PRIVACY_POLICY } from "constants/urls";
import { FormValues } from "../types";

export default function PrivacyPolicyCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <Checkbox
      error={errors.checkedPolicy?.message}
      disabled={isSubmitting}
      {...register("checkedPolicy")}
    >
      By checking this box, you declare that you have read and agreed to our{" "}
      <a
        href={PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-angel-blue"
      >
        Privacy Policy
      </a>
      <span className="text-failed-red ml-0.5">*</span>
    </Checkbox>
  );
}
