import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";

const name: keyof FormValues = "hasAgreedToTerms";
export default function Terms({ classes = "" }: { classes?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className={`${classes} flex items-center gap-3 relative`}>
      <input
        className="appearance-none border relative border-gray-d2 dark:border-white rounded w-6 h-6 checked:before:content-['✓'] before:absolute-center before:text-xl focus:outline-none focus:ring-2 focus:ring-orange"
        type="checkbox"
        {...register(name)}
        id={name}
      />
      <label className="" htmlFor={name}>
        I have read and I agree with{" "}
        <a
          className="underline text-orange"
          target="_blank"
          href="https://angelprotocol.io/terms-of-use"
          rel="noopener noreferrer"
        >
          Terms & Conditions
        </a>
        .
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        as="p"
        className="absolute -bottom-6 left-0 text-left text-xs text-red dark:text-red-l4"
      />
    </div>
  );
}
