import { type ITicker, tickers } from "@better-giving/stocks";
import { CloseButton, ComboboxOption } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Form as FormContainer } from "components/form";
import {
  type TTokenState,
  TokenCombobox,
  TokenField,
  btn_disp,
} from "components/token-field";
import Fuse from "fuse.js";
import { ru_vdec } from "helpers/decimal";
import { useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { href } from "react-router";
import type { ITokenEstimate } from "types/api";
import { init_ticker_option } from "../../common/constants";
import { MethodBenefits } from "../../common/method-benefits";
import { TipField } from "../../common/tip-field";
import { use_donation } from "../../context";
import {
  type StocksDonationDetails as FV,
  type TMethodState,
  stocks_donation_details,
  to_step,
} from "../../types";

const tickers_fuse = new Fuse<ITicker>(tickers, {
  keys: ["symbol", "name"],
});
const subset = tickers.slice(0, 10);

export function Form(props: TMethodState<"stocks">) {
  const [ticker_state, set_ticker_state] = useState<TTokenState>(undefined);
  const [ticker_q, set_ticker_q] = useState("");
  const filtered = useMemo(
    () =>
      !ticker_q
        ? subset
        : tickers_fuse.search(ticker_q, { limit: 10 }).map((x) => x.item),
    [ticker_q]
  );

  const { don_set, don } = use_donation();
  const initial: FV = {
    ticker: init_ticker_option,
    tip: "",
    tip_format: don.recipient.hide_bg_tip ? "none" : "15",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: props.fv || initial,
    criteriaMode: "all",
    resolver: valibotResolver(stocks_donation_details),
  });

  const { field: ticker } = useController<FV, "ticker">({
    control: control,
    name: "ticker",
  });

  const { field: tip_format } = useController({
    name: "tip_format",
    control,
  });

  const combobox = (
    <TokenCombobox
      by="symbol"
      classes="[&:has(:placeholder-shown)]:w-34 w-24"
      disabled={ticker_state === "loading"}
      q={ticker_q}
      on_q_change={(x) => set_ticker_q(x)}
      btn_disp={(open) => btn_disp(open, ticker_state)}
      input_disp={(t) => t.symbol}
      input_placeholder="Select ticker"
      opt_disp={(t) => {
        return (
          <ComboboxOption
            as={CloseButton}
            key={t.symbol}
            className={
              "w-full text-left space-y-0.5 text-xs p-2 hover:bg-(--accent-secondary) data-selected:bg-(--accent-secondary) data-selected:pointer-events-none cursor-pointer"
            }
            value={t}
          >
            <span className="font-semibold text-gray-d1 block">{t.symbol}</span>
            <span className="text-xs">{t.name}</span>
          </ComboboxOption>
        );
      }}
      value={ticker.value}
      opts={filtered}
      // reapply to portaled
      opts_styles={{ "--accent-secondary": don.config?.accent_secondary }}
      on_change={async (t) => {
        try {
          ticker.onChange({ ...t, amount: ticker.value.amount });
          set_ticker_state("loading");
          const res = await fetch(
            href("/api/tickers/:symbol/estimate", { symbol: t.symbol })
          );
          if (!res.ok) throw res;
          const { rate, min }: ITokenEstimate = await res.json();
          set_ticker_state(undefined);
          ticker.onChange({ ...ticker.value, ...t, rate, min });
        } catch (err) {
          console.error(err);
          set_ticker_state("error");
        }
      }}
    />
  );

  return (
    <FormContainer
      className="flex flex-col gap-y-2 h-full"
      onSubmit={handleSubmit((fv) =>
        // skip donor step
        to_step("stocks", fv, "checkout", don_set)
      )}
    >
      <TokenField
        combobox={combobox}
        ref={ticker.ref}
        amount={ticker.value.amount}
        amount_usd={ticker.value.rate * +ticker.value.amount}
        on_change={(x) => ticker.onChange({ ...ticker.value, amount: x })}
        error={errors.ticker?.amount?.message || errors.ticker?.symbol?.message}
        label="Donation amount"
        min_amount={
          ticker.value.min ? (
            <p className="text-xs mb-1">
              Minimum amount: {ticker.value.symbol}{" "}
              {ru_vdec(ticker.value.min, ticker.value.rate)}
            </p>
          ) : null
        }
      />

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

            const amnt = getValues("ticker.amount");
            if (!amnt) return setValue("tip", "");

            const v = (+format / 100) * +amnt;
            setValue("tip", ru_vdec(v, 1));
          }}
          custom_tip={
            tip_format.value === "custom" ? (
              <div className="relative w-full">
                <input
                  {...register("tip")}
                  type="number"
                  step="any"
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

      <MethodBenefits subject="stock" classes="mt-4" />
      <button
        disabled={isSubmitting}
        className="mt-auto btn btn-blue text-sm enabled:bg-(--accent-primary)"
        type="submit"
      >
        Continue
      </button>
    </FormContainer>
  );
}
