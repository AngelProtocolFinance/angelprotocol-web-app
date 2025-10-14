import { CloseButton, ComboboxOption } from "@headlessui/react";
import { Form as FieldSet } from "components/form";
import { TokenCombobox, TokenField, btn_disp } from "components/token-field";
import { useState } from "react";
import { href } from "react-router";
import use_swr from "swr/immutable";
import type { ICurrenciesFv, ICurrencyFv } from "types/currency";
import { USD_CODE } from "../../common/constants";
import { ContinueBtn } from "../../common/continue-btn";
import { Incrementers } from "../../common/incrementers";
import { use_donation_state } from "../../context";
import { next_form_state } from "../helpers";
import { Frequency } from "./frequency";
import type { Props } from "./types";
import { use_rhf } from "./use-rhf";

export function Form(props: Props) {
  const [token_q, set_token_q] = useState("");
  const { set_state } = use_donation_state();
  const rhf = use_rhf(props);

  const currency = use_swr(
    href("/api/currencies"),
    (path) => fetch(path).then<ICurrenciesFv>((res) => res.json()),
    {
      onSuccess: (data) => {
        if (!data.pref) return;
        rhf.currency.onChange(data.pref);
      },
    }
  );
  const opts = currency.data?.all || [];
  const filtered = token_q
    ? opts.filter((c) => c.code.toLowerCase().includes(token_q.toLowerCase()))
    : opts.slice(0, 10);

  const combobox = (
    <TokenCombobox
      by="code"
      classes="[&:has(:placeholder-shown)]:w-34 w-22"
      disabled={currency.isLoading || currency.isValidating}
      q={token_q}
      on_q_change={(x) => set_token_q(x)}
      btn_disp={(open) => btn_disp(open, undefined)}
      input_disp={(t) => t.code}
      opt_disp={(t) => {
        return (
          <ComboboxOption
            as={CloseButton}
            key={t.code}
            className={
              "w-full grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-2 p-2 hover:bg-(--accent-secondary) data-selected:bg-(--accent-secondary) data-selected:pointer-events-none cursor-pointer"
            }
            value={t}
          >
            {t.code}
          </ComboboxOption>
        );
      }}
      value={rhf.currency.value}
      opts={filtered}
      on_change={async (t) => rhf.currency.onChange(t)}
    />
  );

  return (
    <FieldSet
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
      <TokenField
        ref={rhf.amount.ref}
        combobox={combobox}
        amount={rhf.amount.value}
        amount_usd={
          rhf.currency.value.code === "USD"
            ? 0
            : +rhf.amount.value / rhf.currency.value.rate
        }
        on_change={(x) => rhf.amount.onChange(x)}
        error={rhf.errors.amount?.message}
        label="Donation amount"
        min_amount={
          rhf.currency.value.min ? (
            <p className="text-sm mb-1">
              Minimum amount: {rhf.currency.value.code} {rhf.currency.value.min}
            </p>
          ) : null
        }
      />
      {rhf.currency.value.rate && (
        <Incrementers
          disabled={currency.isLoading || currency.isValidating}
          on_increment={rhf.on_increment}
          code={rhf.currency.value.code}
          rate={rhf.currency.value.rate}
          increments={props.init.config?.increments}
          precision={0}
        />
      )}

      <p className="text-sm dark:text-gray mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn
        disabled={
          currency.isLoading || currency.isValidating || !!currency.error
        }
        className="mt-2"
        type="submit"
      />
    </FieldSet>
  );
}

function createTooltip({ code, min }: ICurrencyFv): string | undefined {
  if (!min) return undefined;
  return code === USD_CODE
    ? "The minimum donation amount is 1 USD"
    : `The minimum donation amount is 1 USD or ${min} ${code.toUpperCase()}`;
}
