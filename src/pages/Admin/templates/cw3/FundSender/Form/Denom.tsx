import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
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
        <img
          src={tokens[denom].icon}
          alt=""
          className="w-4 h-4 object-contain"
        />
        <span className={`ml-1.5`}>{tokens[denom].symbol}</span>
      </label>
    </div>
  );
}

export default memo(Denom);
