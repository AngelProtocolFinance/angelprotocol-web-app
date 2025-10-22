import { CloseButton, ComboboxOption } from "@headlessui/react";
import { Field, Form as FieldSet } from "components/form";
import { TokenCombobox, TokenField, btn_disp } from "components/token-field";
import { useState } from "react";
import { href } from "react-router";
import use_swr from "swr/immutable";
import type { ICurrenciesFv } from "types/currency";
import { Incrementers } from "../../common/incrementers";
import { use_donation_state } from "../../context";
import { next_form_state } from "../helpers";
import { Frequency } from "./frequency";
import type { Props } from "./types";
import { use_rhf } from "./use-rhf";

export function Form(props: Props) {
  const [token_q, set_token_q] = useState("");
  const [with_tip, set_with_tip] = useState(true);
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
              "w-full text-sm grid grid-cols-[auto_1fr] justify-items-start items-center gap-x-2 p-2 hover:bg-(--accent-secondary) data-selected:bg-(--accent-secondary) data-selected:pointer-events-none cursor-pointer"
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
      className="grid"
    >
      <Frequency
        value={rhf.frequency.value}
        onChange={rhf.frequency.onChange}
        error={rhf.errors.frequency?.message}
      />
      <TokenField
        classes={{ container: "mt-4 mb-1" }}
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
            <p className="text-[13px]">
              Minimum amount: {rhf.currency.value.min} {rhf.currency.value.code}
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

      <div className="grid mt-4 grid-cols-2 gap-2 content-start">
        <p className="col-span-full text-sm font-semibold">
          Payment information
        </p>
        <Field
          {...rhf.register("first_name")}
          label="First name"
          placeholder="First Name"
          required
          classes={{
            label: "font-semibold text-base sr-only",
            input: "field-input-donate",
          }}
          error={rhf.errors.first_name?.message}
        />
        <Field
          {...rhf.register("last_name")}
          label="Last name"
          placeholder="Last Name"
          classes={{
            input: "field-input-donate",
            label: "font-semibold text-base sr-only",
          }}
          error={rhf.errors.last_name?.message}
        />
        <Field
          {...rhf.register("email")}
          label="Your email"
          placeholder="Your email"
          classes={{
            container: "col-span-full",
            input: "field-input-donate",
            label: "font-semibold text-base sr-only",
          }}
          error={rhf.errors.email?.message}
        />
      </div>

      <button
        disabled={
          currency.isLoading || currency.isValidating || !!currency.error
        }
        className="mt-2 btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FieldSet>
  );
}
