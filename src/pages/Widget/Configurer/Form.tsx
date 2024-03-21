import { SplitSlider } from "components/donation/Steps/Splits";
import { FormHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import EndowmentSelector from "./EndowmentSelector";
import { FormValues as FV } from "./types";

export default function Form({
  className = "",
  onSubmit,
  onReset,
}: FormHTMLAttributes<HTMLFormElement>) {
  const {
    field: { onChange, value },
  } = useController<Pick<FV, "liquidPercentage">>({ name: "liquidPercentage" });

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      className={`${className} grid content-start gap-6 text-sm`}
    >
      <label className="-mb-4">Nonprofit name:</label>
      <EndowmentSelector />

      <span className="-mb-4">Define split value by default:</span>
      <SplitSlider liquidSplitPct={value} setLiquidSplitPct={onChange} />

      <div className="flex gap-3 w-full max-xl:justify-center mt-4">
        <button type="reset" className="btn-outline-filled max-sm:mx-auto w-40">
          Reset Changes
        </button>
        <button type="submit" className="btn-blue max-sm:mx-auto w-40">
          Update Snippet
        </button>
      </div>
    </form>
  );
}
