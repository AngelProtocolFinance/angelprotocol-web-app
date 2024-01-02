import { useState } from "react";
import { WiseCurrency } from "types/aws";
import useDebouncer from "hooks/useDebouncer";
import Requirements from "./Requirements";
import ExpectedFunds from "./Requirements/ExpectedFunds";
import WiseCurrencies from "./Requirements/WiseCurrencies";

export default function V2Form() {
  const [currency, setCurrency] = useState<Pick<WiseCurrency, "code" | "name">>(
    { code: "USD", name: "United States Dollar" }
  );
  const [amount, setAmount] = useState("1000");
  const [debouncedAmount, isDebouncing] = useDebouncer(amount, 1000);

  return (
    <div className="grid w-full gap-6 p-6 border border-prim rounded bg-white dark:bg-blue-d6 max-w-4xl">
      <h3 className="text-2xl font-body">Bank account details</h3>
      <p className="-mt-4 text-lg font-semibold">
        The following information will be used to register your bank account
        that will be used to withdraw your funds.
      </p>
      <WiseCurrencies
        onChange={(c) => setCurrency(c)}
        value={currency}
        disabled={false}
        classes={{ combobox: "w-full md:w-80" }}
      />
      <ExpectedFunds
        value={amount}
        onChange={(amount) => setAmount(amount)}
        classes={{ input: "md:w-80" }}
      />
      <Requirements />
    </div>
  );
}
