import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";

export default function Terms() {
  const { register } = useFormContext<DonateValues>();
  return (
    <div className="my-3 flex items-start">
      <input
        type="checkbox"
        className="mr-2 mt-0.5"
        id="confirmRole"
        {...register("isAgreedToTerms")}
      />
      <label
        htmlFor="confirmRole"
        className="text-angel-grey font-light text-xs"
      >
        By clicking this button and donating with Angel Protocol, you
        acknowledge that you have read and accept the{" "}
        <a
          className="text-blue"
          href="https://storageapi2.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/Donor Terms of Use - Angel Protocol - v1.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Donor Terms of Use
        </a>
      </label>
    </div>
  );
}
