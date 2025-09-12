import { CurrencySelector } from "components/currency-selector";
import { Form as FormContainer, MaskedInput } from "components/form";
import { currency as curr_mask } from "components/form/masks";
import { useEffect } from "react";
import useSWR from "swr/immutable";
import type { DBCurrency } from "types/currency";
import { USD_CODE } from "../../common/constants";
import ContinueBtn from "../../common/continue-btn";
import Incrementers from "../../common/incrementers";
import { ProgramSelector } from "../../common/program-selector";
import { use_donation_state } from "../../context";
import { next_form_state } from "../helpers";
import Frequency from "./frequency";
import type { Props } from "./types";
import { use_rhf } from "./use-rhf";

export default function Form(props: Props) {
  const currency = useSWR("/api/currencies", (path) =>
    fetch(path).then((res) => res.json())
  );
  const { set_state } = use_donation_state();
  const rhf = use_rhf(props);

  const user_currency = currency.data?.pref;
  //biome-ignore lint:
  useEffect(() => {
    if (user_currency && !props.details?.currency) {
      rhf.currency.onChange(user_currency);
    }
  }, [user_currency]);

  return (
    <FormContainer
      onSubmit={rhf.handleSubmit((fv) => {
        set_state((prev) => next_form_state(prev, { ...fv, method: "stripe" }));
      })}
      className="grid gap-4"
    >
      <Frequency
        value={rhf.frequency.value}
        onChange={rhf.frequency.onChange}
        error={rhf.errors.frequency?.message}
      />
      <CurrencySelector
        currencies={{
          isLoading: currency.isLoading,
          isFetching: currency.isValidating,
          isError: !!currency.error,
          data: currency.data?.all,
        }}
        label="Currency"
        onChange={rhf.currency.onChange}
        value={rhf.currency.value}
        classes={{
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
        }}
        required
      />
      <MaskedInput
        id="donation-amount"
        inputMode="decimal"
        mask={curr_mask.opts}
        ref={rhf.amount.ref}
        value={curr_mask.mask(rhf.amount.value)}
        onChange={(x) => rhf.amount.onChange(curr_mask.unmask(x))}
        label="Donation amount"
        placeholder="Enter amount"
        classes={{
          label: "font-heading font-semibold text-base",
          input: "field-input-donate",
        }}
        error={rhf.errors.amount?.message}
        required
        // validation must be dynamicly set depending on which exact currency is selected
        sub={createTooltip(rhf.currency.value)}
      />
      {rhf.currency.value.rate && (
        <Incrementers
          on_increment={rhf.on_increment}
          code={rhf.currency.value.code}
          rate={rhf.currency.value.rate}
          increments={props.init.config?.increments}
          precision={0}
        />
      )}

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        // program not allowed for fund (id string)
        <ProgramSelector
          endowId={+props.init.recipient.id}
          classes="mt-4"
          program={rhf.program.value}
          onChange={rhf.program.onChange}
        />
      )}

      <p className="text-sm dark:text-gray mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn className="mt-2" type="submit" />
    </FormContainer>
  );
}

function createTooltip({ code, min }: DBCurrency): string | undefined {
  if (!min) return undefined;
  return code === USD_CODE
    ? "The minimum donation amount is 1 USD"
    : `The minimum donation amount is 1 USD or ${min} ${code.toUpperCase()}`;
}
