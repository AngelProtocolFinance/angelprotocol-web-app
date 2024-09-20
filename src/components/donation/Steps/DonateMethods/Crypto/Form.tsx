import { Field, Input, Label } from "@headlessui/react";
import { skipToken } from "@reduxjs/toolkit/query";
import Icon from "components/Icon";
import { humanize } from "helpers";
import { useEffect } from "react";
import { useTokenEstimateQuery } from "services/aws/crypto";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import type { CryptoFormStep } from "../../types";
import { nextFormState } from "../helpers";
import { TokenSelector } from "./TokenSelector";
import type { DonateValues } from "./types";
import { multipliableAmount, useRhf } from "./useRhf";

export default function Form(props: CryptoFormStep) {
  const { setState } = useDonationState();

  const rhf = useRhf(props);

  const {
    data,
    isLoading,
    isFetching,
    isError: isTokenError,
  } = useTokenEstimateQuery(rhf.token.value.code || skipToken);

  const isTokenDetailsLoading = isFetching || isLoading;

  useEffect(() => {
    console.log("run effect");
    if (data) {
      const rate = data.fiat_equivalent / data.min_amount;
      rhf.setValue("rate", rate);
      rhf.setValue("min", data.min_amount);
      rhf.setValue("amount", "");
    }
  }, [data]);

  function submit(fv: DonateValues) {
    setState((prev) => nextFormState(prev, { ...fv, method: "crypto" }));
    rhf.reset();
  }

  const rate = rhf.watch("rate");
  const amnt = rhf.watch("amount");

  console.log(rhf.errors);

  return (
    <form
      onSubmit={rhf.handleSubmit(submit)}
      className="flex flex-col gap-4 rounded-md min-h-full"
      autoComplete="off"
    >
      <TokenSelector
        error={
          rhf.errors.token?.id?.message ||
          (isTokenError ? "token not available" : "")
        }
        isError={isTokenError}
        token={rhf.token.value}
        onChange={rhf.token.onChange}
      />

      <Field className="grid" disabled={isTokenDetailsLoading || isTokenError}>
        <div className="flex items-center justify-between">
          <Label className="block mb-2 red-asterisk font-semibold font-heading">
            Donation amount
          </Label>
          <p className="text-sm text-navy-l1">
            ${humanize(rate * multipliableAmount(amnt))}
          </p>
        </div>
        <div className="relative">
          <Input
            placeholder="Enter amount"
            {...rhf.register("amount")}
            className="disabled:bg-gray-l5 w-full font-heading bg-transparent py-[13px] px-5 placeholder:text-navy-l3 text-navy-d4 border border-gray-l3 rounded-lg text-base font-semibold placeholder:font-medium outline-blue-d1 outline-offset-4"
          />

          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            {isTokenDetailsLoading ? (
              <Icon type="Loading" className="animate-spin text-navy-l1 " />
            ) : null}
          </div>
        </div>
        <p className="text-red text-xs mt-1.5 empty:hidden">
          {rhf.errors.amount?.message}
        </p>
      </Field>

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        <ProgramSelector
          classes="my-2"
          endowId={props.init.recipient.id}
          program={rhf.program.value}
          onChange={rhf.program.onChange}
        />
      )}

      <ContinueBtn
        disabled={isTokenError || isTokenDetailsLoading}
        className="mt-auto"
        type="submit"
      />
    </form>
  );
}
