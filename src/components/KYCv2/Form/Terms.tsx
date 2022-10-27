import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";

export default function Terms({ classes = "" }: { classes?: string }) {
  const { register } = useFormContext<FormValues>();
  return (
    <div className={`${classes} flex items-center gap-3`}>
      <input
        className="appearance-none border relative border-gray-d2 dark:border-white rounded w-6 h-6 checked:before:content-['✓'] before:absolute-center before:text-xl"
        type="checkbox"
        {...register("hasAgreedToTerms")}
        id="hasAgreedToTerms"
      />
      <label className="" htmlFor="hasAgreedToTerms">
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
    </div>
  );
}
