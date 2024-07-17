import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Slider from "@radix-ui/react-slider";
import dappLogo from "assets/images/bettergiving-logo.png";
import waivingLaira from "assets/laira/laira-waiving.png";
import Image from "components/Image/Image";
import { humanize } from "helpers";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { useDonationState } from "../Context";
import BackBtn from "../common/BackBtn";
import ContinueBtn from "../common/ContinueBtn";
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

  const [symbol, amount, decimals = 2] = (() => {
    switch (details.method) {
      case "stripe":
        return [details.currency.code, +details.amount];
      case "daf":
        return ["usd", +details.amount];
      case "stocks":
        return [details.symbol, +details.numShares];
      case "crypto":
        return [details.token.symbol, +details.token.amount, 4];
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

  return (
    <form
      data-testid="tip-form"
      onSubmit={handleSubmit((fv) =>
        setState({
          ...props,
          step: "summary",
          tip: {
            value: Number(fv.tip.amount),
            format,
          },
        })
      )}
      className="grid content-start p-4 @md/steps:p-8"
    >
      <BackBtn
        type="button"
        onClick={() =>
          setState({
            ...props,
            step: props.init.config?.splitDisabled ? "donate-form" : "splits",
          })
        }
      />
      <h4 className="mt-4 text-lg">
        One-Time Donation to{" "}
        <Image src={dappLogo} className="inline-block h-8 px-1" />
      </h4>
      <p className="text-navy-l1">
        Better Giving offers this donation service free of charge to empower
        nonprofits worldwide. As a nonprofit ourselves, we depend on your
        support. Please consider donating to help us keep it free for all.
      </p>

      {format === "pct" && (
        <Slider.Root
          min={0}
          max={1}
          step={0.01}
          value={[Number(tip.pct)]}
          onValueChange={([pct]) =>
            onTipChange({
              amount: humanize(amount * pct, decimals),
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
                {humanize(tip.amount || "0", decimals)}
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
          Enter custom tip
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
              type="text"
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

      <div className="rounded bg-[--accent-secondary] h-[4.5rem] mt-16 relative">
        <Image
          src={waivingLaira}
          width={50}
          className="absolute left-5 bottom-1"
        />
        <p className="px-[5.32rem] grid place-items-center text-center h-full text-[0.94rem]">
          Thank you for keeping Better Giving free for everyone!
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
