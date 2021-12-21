import { Values } from "../../components/Donater/types";
import { useFormContext } from "react-hook-form";
import { ChurchInfos } from "../Donater/constants";

export default function SelectChurch() {
  const { register } = useFormContext<Values>();

  return (
    <div className="w-full text-center my-2">
      <select
        className="w-full border border-gray-200 p-2"
        {...register("contractAddress")}
      >
        {ChurchInfos.map((item: any) => (
          <option value={item.address}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}
