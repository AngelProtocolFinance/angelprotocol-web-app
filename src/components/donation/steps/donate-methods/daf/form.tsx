import { Form as FormContainer } from "components/form";
import { MaskedInput } from "components/form";
import { dollar } from "components/form/masks";
import { usd_option } from "../../common/constants";
import { ContinueBtn } from "../../common/continue-btn";
import { Incrementers } from "../../common/incrementers";
import { use_donation_state } from "../../context";
import { next_form_state } from "../helpers";
import type { Props } from "./types";
import { use_rhf } from "./use-rhf";

export function Form(props: Props) {
  const { set_state } = use_donation_state();
  const rhf = use_rhf(props);

  return (
    <FormContainer
      disabled={rhf.isSubmitting}
      onSubmit={rhf.handleSubmit((fv) =>
        set_state((prev) => next_form_state(prev, { ...fv, method: "daf" }))
      )}
      className="flex flex-col gap-4 min-h-full"
    >
      <MaskedInput
        id="donation-amount"
        inputMode="decimal"
        mask={dollar.opts}
        ref={rhf.amount.ref}
        value={rhf.amount.value ? dollar.mask(+rhf.amount.value) : ""}
        onChange={(x) => rhf.amount.onChange(dollar.unmask(x))}
        label="Donation amount"
        placeholder="$ Enter amount"
        classes={{
          label: " font-semibold",
          input: "field-input-donate",
          container: "mt-1",
        }}
        required
        error={rhf.errors.amount?.message}
      />

      <Incrementers
        on_increment={rhf.on_increment}
        code={usd_option.code}
        rate={usd_option.rate}
        increments={props.init.config?.increments}
        classes="mb-4"
        precision={0}
      />

      <button
        className="mt-auto btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FormContainer>
  );
}
