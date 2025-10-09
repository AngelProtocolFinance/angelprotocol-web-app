import { DONATION_INCREMENTS } from "constants/common";
import { TokenField } from "../../../../token-field";
import { ContinueBtn } from "../../common/continue-btn";
import { Incrementers } from "../../common/incrementers";
import { use_donation_state } from "../../context";
import type { CryptoFormStep } from "../../types";
import { next_form_state } from "../helpers";
import type { DonateValues } from "./types";
import { use_rhf } from "./use-rhf";

export function Form(props: CryptoFormStep) {
  const { set_state } = use_donation_state();

  const { handleSubmit, reset, token, errors, on_increment } = use_rhf(props);

  function submit(fv: DonateValues) {
    set_state((prev) => next_form_state(prev, { ...fv, method: "crypto" }));
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
        on_change={token.onChange}
        error={errors.token}
        label="Donation amount"
      />

      {token.value.id && token.value.rate && (
        <Incrementers
          on_increment={on_increment}
          code={token.value.symbol}
          rate={token.value.rate}
          precision={token.value.precision}
          increments={(
            props.init.config?.increments || DONATION_INCREMENTS
          ).map((i) => {
            const v = +i.value / token.value.rate ** 2;
            return { ...i, value: v.toString() };
          })}
        />
      )}

      <ContinueBtn className="mt-auto" type="submit" />
    </form>
  );
}
