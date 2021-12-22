import { ErrorMessage } from "@hookform/error-message";
import { Dec } from "@terra-money/terra.js";
import { currency_text, denoms } from "constants/currency";
import toCurrency from "helpers/toCurrency";
import { useFormContext } from "react-hook-form";
import { useGovStaker } from "services/terra/hooks";
import { Values } from "./types";

export default function Amount() {
  const {
    watch,
    register,
    formState: { errors },
    setValue,
  } = useFormContext<Values>();
  const gov_staker = useGovStaker();

  // sum up all the claims for a Gov Staker addr to get total claimable amount
  let balance = 0;
  // TO DO: check if claims exist for staker
  // gov_staker.claims.forEach((c) => (balance += <claim amount>.div(1e6).toNumber()));

  return (
    <div className="grid">
      <div className="flex text-angel-grey font-bold mb-5">
        <p>Claimable:</p>
        <p>{balance} HALO</p>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        as="span"
        className="text-red-400 text-xs mb-1 mt-0.5"
      />
    </div>
  );
}
