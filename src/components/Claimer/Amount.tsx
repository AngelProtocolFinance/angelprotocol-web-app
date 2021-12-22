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

  let balance = +gov_staker.balance / 1e6; // converting uHALO to HALO (1 HALO = 1e6 uHALO)

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
