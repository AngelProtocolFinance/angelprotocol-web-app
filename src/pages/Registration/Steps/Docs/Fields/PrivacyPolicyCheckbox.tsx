import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import Checkbox from "components/Checkbox/Checkbox";
import { PRIVACY_POLICY } from "constants/urls";

export default function PrivacyPolicyCheckbox() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <Checkbox
      error={errors.hasAgreedToTerms?.message}
      disabled={isSubmitting}
      {...register("hasAgreedToTerms")}
    >
      By checking this box, you declare that you have read and agreed to our{" "}
      <a
        href={PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer noopener"
        className="underline text-blue"
      >
        Privacy Policy
      </a>
      <span className="text-red ml-0.5">*</span>
    </Checkbox>
  );
}
