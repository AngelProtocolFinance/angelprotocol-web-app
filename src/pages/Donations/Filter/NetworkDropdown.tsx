import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FilterFormValues } from "./types";
import { useChainsQuery } from "services/apes";

const NetworkDropdown: FC = () => {
  const { data: networks, isLoading } = useChainsQuery("");
  const { register } = useFormContext<FilterFormValues>();
  return (
    <div className="flex flex-col text-gray-d2 gap-2">
      <label className="dark:text-white">Network</label>
      <select
        {...register("network")}
        className={
          "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-md border-collapse p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
        }
      >
        <option value="default">
          {isLoading ? "Loading..." : "Select a network..."}
        </option>
        {networks?.map((network) => (
          <option key={network.chain_id} value={network.chain_name}>
            {network.chain_name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default NetworkDropdown;
