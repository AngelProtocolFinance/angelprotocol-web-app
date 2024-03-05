import { Form } from "components/form";
import { useFormContext } from "react-hook-form";
import PasswordField from "./PasswordField";
import { FormValues } from "../types";

type Props = {
  className?: string;
  submit: (fv: FormValues) => Promise<void>;
};

export default function OnlyPasswordForm({ className = "", submit }: Props) {
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useFormContext<FormValues>();

  return (
    <Form
      className={`${className} grid`}
      disabled={isSubmitting}
      onSubmit={handleSubmit(submit)}
    >
      <PasswordField />
      <button
        type="submit"
        className="btn-blue rounded-full normal-case px-4 w-full mt-4"
      >
        {isSubmitting ? "Submitting..." : "Create account"}
      </button>
    </Form>
  );
}
