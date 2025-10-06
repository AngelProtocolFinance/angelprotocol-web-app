import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Slider from "@radix-ui/react-slider";
import dapp_logo from "assets/images/logo-rectangle.svg";
import laira_gift from "assets/laira/laira-gift.webp";
import laira_standing_front from "assets/laira/laira-standing-front.webp";
import { Image } from "components/image/image";
import { APP_NAME } from "constants/env";
import { centsDecimals, humanize, roundDown } from "helpers/decimal";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { BackBtn } from "../common/back-btn";
import { summary_data } from "../common/constants";
import { ContinueBtn } from "../common/continue-btn";
import { use_donation_state } from "../context";
import type { TipFormat, TipStep } from "../types";

const DEFAULT_PCT = "0.17";

interface ITip {
  pct: string;
  amount: string;
}

type FV = {
  tip: ITip;
};

const tipSchema = schema<ITip>({
  amount: stringNumber(
    (s) => s,
    (n) => n.min(0, "can't be negative")
  ),
});

const shape = schema<FV>({
  tip: tipSchema,
});

export function Tip(props: TipStep) {
  const { details, tip: persistedTip } = props;
  const { set_state } = use_donation_state();

  const [symbol, amount, rate = 1, decimals = 2] = (() => {
    switch (details.method) {
      case "stripe":
        return [details.currency.code, +details.amount, details.currency.rate];
      case "daf":
        return ["usd", +details.amount];
      case "stocks":
        return [details.symbol, +details.num_shares];
      case "crypto":
        const { symbol, amount, rate, precision } = details.token;
        return [symbol, +amount, rate, precision];
    }
  })();

  const initial: ITip = {
    amount: `${amount * +DEFAULT_PCT}`,
    pct: DEFAULT_PCT,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FV>({
    resolver: yupResolver(shape),
    defaultValues: {
      tip: persistedTip
        ? {
            amount: persistedTip.value.toString(),
            pct: `${persistedTip.value / amount}`,
          }
        : initial,
    },
  });
  const {
    field: { value: tip, onChange: onTipChange },
  } = useController<FV, "tip">({ name: "tip", control });

  const [format, setFormat] = useState<TipFormat>(
    persistedTip?.format ?? "pct"
  );

  const withTip = (tip.amount ? +tip.amount : 0) > 0;

  return (
    <form
      data-testid="tip-form"
      onSubmit={handleSubmit((fv) => {
        // go straight to summary: donor info is retrieved from donor's DAF account
        if (props.details.method === "daf") {
          return set_state({
            ...props,
            ...summary_data(props),
            step: "submit",
            tip: {
              value: Number(fv.tip.amount),
              format,
            },
          });
        }

        set_state({
          ...props,
          step: "summary",
          tip: {
            value: Number(fv.tip.amount),
            format,
          },
        });
      })}
      className="grid content-start p-4 @md/steps:p-8"
    >
      <BackBtn
        type="button"
        onClick={() => set_state({ ...props, step: "donate-form" })}
      />
      <h4 className="mt-4 text-lg">
        One-Time Donation to{" "}
        <Image
          src={dapp_logo}
          className="inline-block h-4 px-1 relative bottom-0.5"
        />
      </h4>
      <p className="text-gray">
        {APP_NAME} offers this donation service{" "}
        <span className={withTip ? "" : "font-bold"}>free of charge</span> to
        empower nonprofits worldwide. As a nonprofit ourselves, we depend on
        your support. Please consider donating to help us keep it free for all.
      </p>

      {format === "pct" && (
        <Slider.Root
          min={0}
          max={1}
          step={0.01}
          value={[Number(tip.pct)]}
          onValueChange={([pct]) =>
            onTipChange({
              amount: roundDown(amount * pct, decimals),
              pct,
            })
          }
          className="relative flex items-center select-none touch-none mt-16"
        >
          <Slider.Track className="relative grow rounded-full h-1.5 bg-[#EAECEB]">
            <Slider.Range className="absolute bg-(--accent-primary) rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] shadow-lg shadow-black/15 rounded-[6px] relative">
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <div className="absolute -top-9 px-2 py-0.5 rounded-sm text-sm">
              <span className="text-xs uppercase mr-0.5">{symbol}</span>
              <span className="mr-0.5">
                {humanize(tip.amount || "0", centsDecimals(rate, decimals))}
              </span>
              <span className="text-gray text-xs">
                ({(Number(tip.pct) * 100).toFixed(0)}%)
              </span>
            </div>
          </Slider.Thumb>
        </Slider.Root>
      )}
      {format === "pct" && (
        <button
          type="button"
          onClick={() => setFormat("amount")}
          className="justify-self-center text-sm mt-6 underline hover:text-[color:var(--accent-primary)]"
        >
          Enter custom donation
        </button>
      )}

      {format === "amount" && (
        <div className="mt-6">
          <label
            data-required
            htmlFor="tip-custom-amount"
            className="label mb-2 block text-base font-heading font-semibold"
          >
            Your One-Time Donation Amount
          </label>
          <div
            aria-invalid={!!errors.tip?.amount?.message}
            className="relative"
          >
            <input
              id="tip-custom-amount"
              className="field-input field-input-donate pl-14"
              type="number"
              value={tip.amount}
              onChange={(e) =>
                onTipChange({
                  amount: e.target.value,
                  pct: +e.target.value / amount,
                })
              }
              placeholder="Enter amount"
            />
            <span className="absolute top-1/2 -translate-y-1/2 left-4 uppercase text-[color:var(--accent-primary)]">
              {symbol}
            </span>
          </div>
          <ErrorMessage
            data-error
            className="field-err mt-1"
            errors={errors}
            name="tip.amount"
            as="p"
          />
        </div>
      )}

      <div className="rounded-sm bg-(--accent-secondary) mt-16 relative px-4 py-2 grid grid-cols-[auto_1fr] gap-x-4 items-center">
        <Image
          src={withTip ? laira_gift : laira_standing_front}
          width={withTip ? 50 : 40}
          className=""
        />
        <p className="self-center text-gray indent-4">
          {!withTip
            ? `Please consider helping keep ${APP_NAME} free for everyone, as a nonprofit we charge no platform fees and rely on your support`
            : `Thank you for keeping ${APP_NAME} free for everyone!`}
        </p>
      </div>

      <p className="text-sm text-gray mt-6">
        Assist us in advancing our mission to connect with global organizations
        and spread our timeless message:{" "}
        <span className="font-medium block">Give today, give forever.</span>
      </p>

      <ContinueBtn type="submit" className="mt-6" />
    </form>
  );
}
