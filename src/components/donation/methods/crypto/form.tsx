import {
  type IToken,
  chains,
  is_custom,
  tokens_list,
} from "@better-giving/assets/tokens";
import { CloseButton, ComboboxOption } from "@headlessui/react";
import { CpfToggle } from "components/donation/common/cpf-toggle";
import { MethodBenefits } from "components/donation/common/method-benefits";
import { Field } from "components/form";
import { TokenCombobox } from "components/token-field/token-combobox";
import { DONATION_INCREMENTS, logo_url } from "constants/common";
import Fuse from "fuse.js";
import { ru_vdec } from "helpers/decimal";
import { useMemo, useState } from "react";
import { href } from "react-router";
import type { ITokenEstimate } from "types/api";
import { TokenField, btn_disp } from "../../../token-field";
import { Incrementers } from "../../common/incrementers";
import { TipField } from "../../common/tip-field";
import { use_donation } from "../../context";
import { type TMethodState, to_checkout } from "../../types";
import type { TTokenState } from "./types";
import { use_rhf } from "./use-rhf";

const tokens_fuse = new Fuse<IToken>(tokens_list, {
  keys: ["name", "code", "network", "symbol"],
});
const subset = tokens_list.slice(0, 10);

export function Form(props: TMethodState<"crypto">) {
  const { don, don_set } = use_donation();
  const [token_state, set_token_state] = useState<TTokenState>(undefined);
  const [token_q, set_token_q] = useState("");
  const filtered = useMemo(
    () =>
      !token_q
        ? subset
        : tokens_fuse.search(token_q, { limit: 10 }).map((x) => x.item),
    [token_q]
  );

  const {
    handleSubmit,
    reset,
    token,
    errors,
    on_increment,
    tip_format,
    cpf,
    setFocus,
    setValue,
    getValues,
    register,
  } = use_rhf(props.fv, don.user, don.recipient.hide_bg_tip ?? false);

  const combobox = (
    <TokenCombobox
      by="code"
      classes="[&:has(:placeholder-shown)]:w-34 w-24"
      disabled={token_state === "loading"}
      q={token_q}
      on_q_change={(x) => set_token_q(x)}
      btn_disp={(open) => btn_disp(open, token_state)}
      input_disp={(t) => t.symbol}
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
            <img
              src={logo_url(t.logo, is_custom(t.id))}
              className="w-6 h-6 rounded-full row-span-2"
            />

            <span className="text-[13px]">{t.symbol}</span>

            <p
              style={{ color: t.color }}
              className="text-xs col-start-2 text-left"
            >
              {chains[t.network].name}
            </p>
          </ComboboxOption>
        );
      }}
      value={token.value}
      opts={filtered}
      // reapply to portaled
      opts_styles={{ "--accent-secondary": don.config?.accentSecondary }}
      on_change={async (t) => {
        try {
          token.onChange({ ...t, amount: token.value.amount });
          set_token_state("loading");
          const res = await fetch(
            href("/api/tokens/:code/min-usd", { code: t.code })
          );
          if (!res.ok) throw res;
          const { rate, min }: ITokenEstimate = await res.json();
          set_token_state(undefined);
          token.onChange({ ...token.value, ...t, rate, min });
        } catch (err) {
          console.error(err);
          set_token_state("error");
        }
      }}
    />
  );

  return (
    <form
      onSubmit={handleSubmit((x) => {
        to_checkout("crypto", x, don_set);
        reset();
      })}
      className="flex flex-col gap-y-2 rounded-md min-h-full"
      autoComplete="off"
    >
      <TokenField
        combobox={combobox}
        ref={token.ref}
        amount={token.value.amount}
        amount_usd={token.value.rate * +token.value.amount}
        on_change={(x) => token.onChange({ ...token.value, amount: x })}
        error={errors.token?.amount?.message || errors.token?.id?.message}
        label="Donation amount"
        min_amount={
          token.value.min ? (
            <p className="text-xs mb-1">
              Minimum amount: {token.value.symbol}{" "}
              {ru_vdec(
                token.value.min,
                token.value.rate,
                token.value.precision
              )}
            </p>
          ) : null
        }
      />

      {token.value.code && !token_state && (
        <Incrementers
          classes="-mt-1"
          disabled={token_state === "error" || token_state === "loading"}
          on_increment={on_increment}
          code={token.value.symbol}
          rate={token.value.rate}
          precision={token.value.precision}
          increments={(don.config?.increments || DONATION_INCREMENTS).map(
            (i) => {
              const v = +i.value / token.value.rate ** 2;
              return { ...i, value: v.toString() };
            }
          )}
        />
      )}

      {don.recipient.hide_bg_tip ? null : (
        <TipField
          classes="mt-2"
          checked={tip_format.value !== "none"}
          checked_changed={(checked) => {
            if (checked) {
              tip_format.onChange("15");
            } else {
              tip_format.onChange("none");
              setValue("tip", "");
            }
          }}
          tip_format={tip_format.value}
          tip_format_changed={async (format) => {
            tip_format.onChange(format);
            if (format === "none") {
              return setValue("tip", "");
            }
            if (format === "custom") {
              await new Promise((r) => setTimeout(r, 50));
              return setFocus("tip");
            }

            const tkn = getValues("token");
            if (!tkn.amount) return setValue("tip", "");

            const v = (+format / 100) * +tkn.amount;
            setValue("tip", ru_vdec(v, tkn.rate, tkn.precision));
          }}
          custom_tip={
            tip_format.value === "custom" ? (
              <div className="relative w-full flex">
                <span className="font-bold text-xs text-gray-d1 self-center">
                  {token.value.symbol}
                </span>
                <input
                  {...register("tip")}
                  inputMode="decimal"
                  className="w-full text-sm pl-2 focus:outline-none"
                  placeholder="Enter contribution amount"
                  aria-invalid={!!errors.tip?.message}
                />
                <span className="right-6 text-xs text-red text-right absolute top-1/2 -translate-y-1/2 empty:hidden">
                  {errors.tip?.message}
                </span>
              </div>
            ) : undefined
          }
        />
      )}

      <CpfToggle
        classes="mt-1"
        checked={cpf.value}
        checked_changed={(x) => cpf.onChange(x)}
      />
      <MethodBenefits subject="crypto" classes="mt-2" />

      <div className="grid mt-4 mb-2 grid-cols-2 gap-2 content-start">
        <p className="col-span-full text-sm font-semibold">
          Payment information
        </p>
        <Field
          {...register("first_name")}
          label="First name"
          placeholder="First Name"
          required
          classes={{
            label: "font-semibold text-base sr-only",
            input: "py-2",
          }}
          error={errors.first_name?.message}
        />
        <Field
          {...register("last_name")}
          label="Last name"
          placeholder="Last Name"
          classes={{
            input: "py-2",
            label: "font-semibold text-base sr-only",
          }}
          error={errors.last_name?.message}
        />
        <Field
          {...register("email")}
          label="Your Email"
          placeholder="Your Email"
          classes={{
            container: "col-span-full",
            input: "py-2",
            label: "font-semibold text-base sr-only",
          }}
          error={errors.email?.message}
        />
      </div>

      <button
        disabled={token_state === "error" || token_state === "loading"}
        className="mt-auto btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}
