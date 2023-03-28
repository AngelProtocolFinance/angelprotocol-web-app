import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import Image from "components/Image";
import { tokens } from "constants/tokens";

function Denom({ denom }: { denom: string }) {
  const { register, watch } = useFormContext<FundSendValues>();
  const isActive = watch("denom") === denom;

  return (
    <div
      className={`cursor-pointer flex items-center ${
        isActive ? "text-orange" : ""
      } p-2 rounded`}
    >
      <input
        id={denom}
        {...register("denom")}
        value={denom}
        type="radio"
        className="w-0 h-0 appearance-none"
      />
      <label
        htmlFor={denom}
        className="uppercase flex items-center text-sm cursor-pointer"
      >
        <Image src={tokens[denom].icon} className="w-4 h-4" />
        <span className={`ml-1.5`}>{tokens[denom].symbol}</span>
      </label>
    </div>
  );
}

export default memo(Denom);
