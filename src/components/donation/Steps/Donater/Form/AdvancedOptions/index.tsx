import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import Icon from "components/Icon";
import Split from "components/Split";

type Props = { classes?: string; unfold?: boolean };

export default function AdvancedOptions({ classes = "", unfold }: Props) {
  const [isOpen, setIsOpen] = useState(unfold);

  const { watch, setValue, formState } = useFormContext<DonateValues>();
  const pctLiquidSplit = watch("pctLiquidSplit");
  const token = watch("token");

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={`grid ${classes} border border-prim  rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-prim h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <Split
          disabled={
            !formState.isValid || formState.isSubmitting || formState.isLoading
          }
          liquidPercentage={pctLiquidSplit}
          token={token}
          onChange={(value) => setValue("pctLiquidSplit", value)}
        />
      )}
    </div>
  );
}
