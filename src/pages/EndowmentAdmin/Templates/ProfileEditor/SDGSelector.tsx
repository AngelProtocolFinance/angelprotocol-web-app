import { useFormContext } from "react-hook-form";
import { UpdateProfileValues } from "pages/EndowmentAdmin/types";
import { unsdgs } from "constants/unsdgs";

export default function SDGSelector() {
  const { register } = useFormContext<UpdateProfileValues>();
  return (
    <select
      {...register("un_sdg")}
      id="sdg__number"
      className="w-full focus:outline-none rounded-md p-3 text-sm uppercase bg-light-grey shadow-inner-white-grey"
    >
      {Object.entries(unsdgs).map(([_key, val]) => (
        <option key={_key} value={_key} className={`text-sm text-angel-grey`}>
          {`${+_key < 10 ? "0" : ""}${_key} - ${val.title}`}
        </option>
      ))}
    </select>
  );
}
