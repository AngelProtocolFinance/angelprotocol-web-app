import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";
import { useGetWallet } from "contexts/WalletContext";
import { Label } from "components/form";
import { denoms, symbols } from "constants/tokens";
import Balance from "./Balance";
import Denom from "./Denom";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<FundSendValues>();

  const { wallet } = useGetWallet();
  const native_currency = wallet!.chain.native_currency; // wallet exists, otherwise wouldn't be able to donate

  const denomText =
    watch("denom") === native_currency.token_id
      ? native_currency.symbol
      : symbols[denoms.halo];

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between">
        <Label required className="mb-2">
          Transfer amount
        </Label>
        <Balance />
      </div>
      <input
        {...register("amount")}
        autoComplete="off"
        id="amount"
        type="text"
        placeholder={denomText}
        className="input-field bg-orange-l6 dark:bg-blue-d7"
      />
      <div className="flex items-start justify-between mt-1">
        <div className="flex">
          <Denom denom={native_currency.token_id} />
          <Denom denom={denoms.halo} />
        </div>
        <ErrorMessage
          errors={errors}
          name="amount"
          as="span"
          className="static field-error mb-1 mt-0.5"
        />
      </div>
    </div>
  );
}
