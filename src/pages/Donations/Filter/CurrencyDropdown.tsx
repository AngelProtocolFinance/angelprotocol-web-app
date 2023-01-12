import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FilterFormValues } from "./types";
import { useCurrenciesQuery } from "services/apes";

const CurrencyDropdown: FC = () => {
  const { data: currencies, isLoading } = useCurrenciesQuery();
  const { register } = useFormContext<FilterFormValues>();
  return (
    <div className="flex flex-col text-gray-d2 gap-2">
      <label className="dark:text-white">Currency</label>
      <select
        {...register("currency")}
        className={
          "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-md border-collapse p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
        }
      >
        <option value="default">
          {isLoading ? "Loading..." : "Select a currency..."}
        </option>
        {currencies?.map((currency) => (
          <option key={currency.token_id} value={currency.symbol}>
            {currency.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CurrencyDropdown;
