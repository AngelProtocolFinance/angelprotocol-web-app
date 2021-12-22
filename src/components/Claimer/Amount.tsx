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

  const balance = gov_staker.claims
    ?.filter((claim) => +claim.release_at.at_time <= Date.now() * 1e6)
    .reduce((prev, claim) => prev + +claim.amount / 1e6, 0);

  return (
    <div className="grid">
      <div className="flex text-angel-grey font-bold mb-5">
        <p>Claimable: {balance} HALO</p>
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
