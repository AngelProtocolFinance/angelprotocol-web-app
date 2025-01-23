import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Slider from "@radix-ui/react-slider";
import dappLogo from "assets/images/bettergiving-logo.webp";
import { laira } from "assets/laira/laira";
import Image from "components/Image/Image";
import { centsDecimals, humanize, roundDown } from "helpers";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { useDonationState } from "../Context";
import BackBtn from "../common/BackBtn";
import ContinueBtn from "../common/ContinueBtn";
import { summaryData } from "../common/constants";
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

export default function Tip(props: TipStep) {
  const { details, tip: persistedTip } = props;
  const { setState } = useDonationState();

  const [symbol, amount, rate = 1, decimals = 2] = (() => {
    switch (details.method) {
      case "stripe":
        return [details.currency.code, +details.amount, details.currency.rate];
      case "daf":
        return ["usd", +details.amount];
      case "stocks":
        return [details.symbol, +details.numShares];
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
          return setState({
            ...props,
            ...summaryData(props),
            step: "submit",
            tip: {
              value: Number(fv.tip.amount),
              format,
            },
          });
        }

        setState({
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
        onClick={() => setState({ ...props, step: "donate-form" })}
      />
      <h4 className="mt-4 text-lg">
        One-Time Donation to{" "}
        <Image src={dappLogo} className="inline-block h-8 px-1" />
      </h4>
      <p className="text-navy-l1">
        Better Giving offers this donation service{" "}
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
            <Slider.Range className="absolute bg-[--accent-primary] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] shadow-lg shadow-black/15 rounded-[6px] relative">
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <span className="w-px h-2.5 bg-[#D9D9D9]" />
            <div className="absolute -top-9 px-2 py-0.5 rounded text-sm">
              <span className="text-xs uppercase mr-0.5">{symbol}</span>
              <span className="mr-0.5">
                {humanize(tip.amount || "0", centsDecimals(rate, decimals))}
              </span>
              <span className="text-navy-l1 text-xs">
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
        <>
          <label className="mb-2 mt-6 font-heading font-semibold">
            Your One-Time Donation Amount
          </label>
          <div
            aria-invalid={!!errors.tip?.amount}
            className="relative field-container field-container-donate grid grid-cols-[1fr_auto] items-center pr-5"
          >
            <input
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
            <span className="uppercase text-[color:var(--accent-primary)]">
              {symbol}
            </span>
            <ErrorMessage
              data-error
              className="field-error text-right mt-2"
              errors={errors}
              name="tip.amount"
              as="p"
            />
          </div>
        </>
      )}

      <div className="rounded bg-[--accent-secondary] mt-16 relative px-4 py-2 grid grid-cols-[auto_1fr] gap-x-4 items-center">
        <Image
          src={withTip ? laira.gift : laira.standingFront}
          width={withTip ? 50 : 40}
          className=""
        />
        <p className="self-center text-navy-l1 indent-4">
          {!withTip
            ? "Please consider helping keep Better Giving free for everyone, as a nonprofit we charge no platform fees and rely on your support"
            : "Thank you for keeping Better Giving free for everyone!"}
        </p>
      </div>

      <p className="text-sm text-navy-l1 mt-6">
        Assist us in advancing our mission to connect with global organizations
        and spread our timeless message:{" "}
        <span className="font-medium block">Give today, give forever.</span>
      </p>

      <ContinueBtn type="submit" className="mt-6" />
    </form>
  );
}
