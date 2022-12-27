import type { FC } from "react";
import { Token } from "types/aws";

type CurrencyDropdownProps = {
  selectedCurrency: string;
  setSelectedCurrency: Function;
  currencies: Token[] | undefined;
};

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  setSelectedCurrency,
  currencies,
}) => {
  return (
    <div className="flex flex-col text-gray-d2 gap-2">
      <label className="dark:text-white">Currency</label>
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        className={
          "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
        }
      >
        <option value="">Select a currency...</option>
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
