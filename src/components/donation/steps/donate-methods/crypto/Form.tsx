import { DONATION_INCREMENTS } from "constants/common";
import TokenField from "../../../../token-field";
import ContinueBtn from "../../common/continue-btn";
import Incrementers from "../../common/incrementers";
import { ProgramSelector } from "../../common/program-selector";
import { useDonationState } from "../../context";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import type { DonateValues } from "./types";
import { useRhf } from "./useRhf";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const { handleSubmit, reset, program, token, errors, onIncrement } =
    useRhf(props);

  function submit(fv: DonateValues) {
    setState((prev) => nextFormState(prev, { ...fv, method: "crypto" }));
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 rounded-md min-h-full"
      autoComplete="off"
    >
      <TokenField
        ref={token.ref}
        token={token.value}
        onChange={token.onChange}
        error={errors.token}
        withBalance
        label="Donation amount"
        classes={{
          label: "font-heading mb-1",
          inputContainer: "field-container-donate pr-5",
        }}
        withMininum
      />

      {token.value.id && token.value.rate && (
        <Incrementers
          onIncrement={onIncrement}
          code={token.value.symbol}
          rate={token.value.rate}
          precision={token.value.precision}
          increments={(
            props.init.config?.increments || DONATION_INCREMENTS
          ).map((i) => ({ ...i, value: i.value / token.value.rate ** 2 }))}
        />
      )}

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        // program not allowed for fund (id string)
        <ProgramSelector
          endowId={+props.init.recipient.id}
          classes="my-2"
          program={program.value}
          onChange={program.onChange}
        />
      )}

      <ContinueBtn className="mt-auto" type="submit" />
    </form>
  );
}
