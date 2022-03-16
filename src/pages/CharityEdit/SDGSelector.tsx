import { unsdgs } from "constants/unsdgs";
import { useFormContext } from "react-hook-form";
import { EditableProfileAttr } from "services/aws/endowments/types";
import Label from "./Label";

export default function SDGSelector() {
  const { register } = useFormContext<EditableProfileAttr>();
  return (
    <div className="mb-6">
      <Label id="sdg__number" text="SDG #" />
      <select
        {...register("un_sdg")}
        id="sdg__number"
        className="w-full focus:outline-none rounded-md bg-white/10 text-white text-opacity-80 border-none p-3 text-sm uppercase mt-1.5 shadow-inner"
      >
        {Object.entries(unsdgs).map(([_key, val]) => (
          <option key={_key} value={_key} className={`text-sm text-angel-grey`}>
            {`${+_key < 10 ? "0" : ""}${_key} - ${val.title}`}
          </option>
        ))}
      </select>
    </div>
  );
}
