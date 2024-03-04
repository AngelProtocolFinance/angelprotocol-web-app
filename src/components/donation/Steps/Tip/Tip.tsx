import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Slider from "@radix-ui/react-slider";
import bgIcon from "assets/favicon.png";
import character from "assets/images/waving-character.png";
import Image from "components/Image/Image";
import { humanize } from "helpers";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { TipStep, setStep, setTip } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../common/BackBtn";

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

export default function Tip({
  details,
  tip: persistedTip,
  format = "pct",
}: TipStep) {
  const dispatch = useSetter();

  const [symbol, amount, decimals = 2] = (() => {
    switch (details.method) {
      case "stripe":
        return [details.currency.code, +details.amount];
      case "daf":
        return ["usd", +details.amount];
      case "stocks":
        return [details.symbol, details.numShares];
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
            amount: persistedTip.toString(),
            pct: `${persistedTip / amount}`,
          }
        : initial,
    },
  });
  const {
    field: { value: tip, onChange: onTipChange },
  } = useController<FV, "tip">({ name: "tip", control });

  //if user selects custom, can't go back to %
  const [isPct, setIsPct] = useState(format === "pct");

  return (
    <form
      onSubmit={handleSubmit((v) =>
        dispatch(
          setTip({
            tip: Number(v.tip.amount),
            format: isPct ? "pct" : "amount",
          })
        )
      )}
      className="grid content-start p-4 @md:p-8"
    >
      <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
      <h4 className="mt-4 text-lg">
        Choose a Donation for{" "}
        <Image src={bgIcon} className="inline-block size-5" /> Better.giving
      </h4>
      <p className="text-gray-d1">
        We are completely free, and rely on donations
      </p>

      {isPct && (
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
            <Slider.Range className="absolute bg-blue-d1 rounded-full h-full" />
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
              <span className="text-gray-d1 text-xs">
                ({(Number(tip.pct) * 100).toFixed(0)}%)
              </span>
            </div>
          </Slider.Thumb>
        </Slider.Root>
      )}
      {isPct && (
        <button
          type="button"
          onClick={() => setIsPct(false)}
          className="justify-self-center text-sm mt-6 underline hover:text-blue"
        >
          Enter custom tip
        </button>
      )}

      {!isPct && (
        <>
          <label className="mb-2 mt-6">Your donation amount</label>
          <div
            aria-invalid={!!errors.tip?.amount}
            className="relative field-container grid grid-cols-[1fr_auto] px-4 py-3"
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
              placeholder="$ Enter amount"
            />
            <span className="uppercase">{symbol}</span>
          </div>
          <div className="empty:mb-4">
            <ErrorMessage
              data-error
              className="static field-error text-right my-1"
              errors={errors}
              name="tip.amount"
              as="p"
            />
          </div>
        </>
      )}

      <div className="rounded bg-blue-l5 h-[4.5rem] mt-16 relative">
        <Image src={character} className="absolute left-1 bottom-0" />
        <p className="px-[5.32rem] grid place-items-center text-center h-full text-[0.94rem]">
          Thank you for keeping Better giving free for everyone!
        </p>
      </div>

      <p className="text-sm text-gray-d1 mt-6">
        Assist us in advancing our mission to connect with global organizations
        and propagate our timeless message:{" "}
        <span className="font-medium block">Give today, give forever.</span>
      </p>

      <button type="submit" className="btn-orange btn-donate mt-6">
        Continue
      </button>
    </form>
  );
}
