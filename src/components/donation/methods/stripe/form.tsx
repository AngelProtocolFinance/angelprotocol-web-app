import { CloseButton, ComboboxOption } from "@headlessui/react";
import { usd_option } from "components/donation/common/constants";
import { CpfToggle } from "components/donation/common/cpf-toggle";
import { Form as FieldSet } from "components/form";
import { type IPrompt, Prompt } from "components/prompt";
import { TokenCombobox, TokenField, btn_disp } from "components/token-field";
import { env } from "constants/env";
import { ru_vdec } from "helpers/decimal";
import { useState } from "react";
import { href } from "react-router";
import use_swr from "swr/immutable";
import type { ICurrenciesFv } from "types/currency";
import { to_custom_id } from "types/paypal";
import { Incrementers } from "../../common/incrementers";
import { TipField } from "../../common/tip-field";
import { use_donation } from "../../context";
import { type TMethodState, to_step } from "../../types";
import { Paypal } from "../paypal";
import { ExpressCheckout } from "./express-checkout";
import { Frequency } from "./frequency";
import { use_rhf } from "./use-rhf";

export function Form(props: TMethodState<"stripe">) {
  const [token_q, set_token_q] = useState("");
  const [prompt, set_prompt] = useState<IPrompt>();
  const { don_set, don } = use_donation();

  const fv = props.fv || {
    amount: "",
    currency: usd_option,
    frequency: "one-time",
    tip: "",
    cover_processing_fee: false,
    tip_format: don.recipient.hide_bg_tip ? "none" : "15",
  };

  const custom_id = to_custom_id({
    env: env === "production" ? "production" : "staging",
    recipient: don.recipient.id,
    program: don.program ? don.program.id : "nil",
    source: don.source,
  });
  const rhf = use_rhf(fv);

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
      // reapply to portaled
      opts_styles={{ "--accent-secondary": don.config?.accent_secondary }}
      on_change={async (t) => rhf.currency.onChange(t)}
    />
  );

  return (
    <FieldSet
      onSubmit={rhf.handleSubmit((fv) =>
        to_step("stripe", fv, "donor", don_set)
      )}
      className="flex flex-col h-full gap-y-2"
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
            <p className="text-[13px]">
              Minimum amount: {rhf.currency.value.min} {rhf.currency.value.code}
            </p>
          ) : null
        }
      />
      {rhf.currency.value.rate && (
        <Incrementers
          classes="-mt-1"
          disabled={currency.isLoading || currency.isValidating}
          on_increment={rhf.on_increment}
          code={rhf.currency.value.code}
          rate={rhf.currency.value.rate}
          increments={don.config?.increments}
          precision={0}
        />
      )}

      {don.recipient.hide_bg_tip ? null : (
        <TipField
          classes="mt-2"
          checked={rhf.tip_format.value !== "none"}
          checked_changed={(checked) => {
            if (checked) {
              rhf.tip_format.onChange("15");
            } else {
              rhf.tip_format.onChange("none");
              rhf.setValue("tip", "");
            }
          }}
          tip_format={rhf.tip_format.value}
          tip_format_changed={async (format) => {
            rhf.tip_format.onChange(format);
            if (format === "none") {
              return rhf.setValue("tip", "");
            }
            if (format === "custom") {
              await new Promise((r) => setTimeout(r, 50));
              return rhf.setFocus("tip");
            }

            const [c, amnt] = rhf.getValues(["currency", "amount"]);
            if (!amnt) return rhf.setValue("tip", "");

            const v = (+format / 100) * +amnt;
            rhf.setValue("tip", ru_vdec(v, 1 / c.rate));
          }}
          custom_tip={
            rhf.tip_format.value === "custom" ? (
              <div className="relative w-full flex">
                <span className="font-bold text-xs text-gray-d1 self-center">
                  {rhf.currency.value.code}
                </span>
                <input
                  {...rhf.register("tip")}
                  inputMode="decimal"
                  className="w-full text-sm pl-2 focus:outline-none"
                  placeholder="Enter contribution amount"
                  aria-invalid={!!rhf.errors.tip?.message}
                />
                <span className="right-6 text-xs text-red text-right absolute top-1/2 -translate-y-1/2 empty:hidden">
                  {rhf.errors.tip?.message}
                </span>
              </div>
            ) : undefined
          }
        />
      )}

      <CpfToggle
        classes="mt-1 mb-4"
        checked={rhf.cpf.value}
        checked_changed={(x) => rhf.cpf.onChange(x)}
      />
      {rhf.stripe_express && !prompt && (
        <ExpressCheckout
          on_error={(msg) =>
            set_prompt({ type: "error", children: <p>{msg}</p> })
          }
          classes="mt-4"
          {...rhf.stripe_express}
        />
      )}
      {rhf.paypal_express &&
        rhf.paypal_express.frequency === "one-time" &&
        !prompt && (
          <Paypal
            {...rhf.paypal_express}
            on_error={(x) =>
              set_prompt({
                type: "error",
                children: x,
              })
            }
          />
        )}

      <button
        disabled={
          currency.isLoading || currency.isValidating || !!currency.error
        }
        className="mt-auto font-medium normal-case rounded py-2 btn-blue enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue with Card/Bank
      </button>
      {prompt && <Prompt {...prompt} onClose={() => set_prompt(undefined)} />}
    </FieldSet>
  );
}
