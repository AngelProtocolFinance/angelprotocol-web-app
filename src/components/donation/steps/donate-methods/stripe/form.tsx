import { getFiatCurrencies } from "api/get/fiat-currencies";
import CurrencySelector from "components/currency-selector";
import { Form as FormContainer, NativeField } from "components/form";
import { useRootData } from "hooks/use-root-data";
import { useEffect } from "react";
import useSWR from "swr/immutable";
import type { Currency } from "types/components";
import { USD_CODE } from "../../common/constants";
import ContinueBtn from "../../common/continue-btn";
import Incrementers from "../../common/incrementers";
import { ProgramSelector } from "../../common/program-selector";
import { useDonationState } from "../../context";
import { nextFormState } from "../helpers";
import Frequency from "./frequency";
import type { Props } from "./types";
import { useRhf } from "./use-rhf";

export default function Form(props: Props) {
  /** supplied by page loader */
  const user = useRootData();
  const currency = useSWR(user?.currency ?? "none", getFiatCurrencies);
  const { setState } = useDonationState();
  const rhf = useRhf(props);

  const userCurrency = currency.data?.main;
  //biome-ignore lint:
  useEffect(() => {
    if (userCurrency) {
      rhf.currency.onChange(userCurrency);
    }
  }, [userCurrency]);

  return (
    <FormContainer
      onSubmit={rhf.handleSubmit((fv) =>
        setState((prev) => nextFormState(prev, { ...fv, method: "stripe" }))
      )}
      className="grid gap-4"
    >
      <Frequency
        value={rhf.frequency.value}
        onChange={rhf.frequency.onChange}
        error={rhf.errors.frequency?.message}
      />
      <CurrencySelector
        currencies={{
          isLoading: currency.isLoading,
          isFetching: currency.isValidating,
          isError: !!currency.error,
          data: currency.data?.all,
        }}
        label="Currency"
        onChange={rhf.currency.onChange}
        value={rhf.currency.value}
        classes={{
          label: "font-semibold",
          combobox: "field-container-donate rounded-lg",
          container: "field-donate",
        }}
        required
      />
      <NativeField
        {...rhf.register("amount")}
        label="Donation amount"
        placeholder="Enter amount"
        classes={{ label: "font-semibold", container: "field-donate" }}
        error={rhf.errors.amount?.message}
        required
        // validation must be dynamicly set depending on which exact currency is selected
        tooltip={createTooltip(rhf.currency.value)}
      />
      {rhf.currency.value.rate && (
        <Incrementers
          onIncrement={rhf.onIncrement}
          code={rhf.currency.value.code}
          rate={rhf.currency.value.rate}
          increments={props.init.config?.increments}
          precision={0}
        />
      )}

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        // program not allowed for fund (id string)
        <ProgramSelector
          endowId={+props.init.recipient.id}
          classes="mt-4"
          program={rhf.program.value}
          onChange={rhf.program.onChange}
        />
      )}

      <p className="text-sm dark:text-navy-l2 mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn className="mt-2" type="submit" />
    </FormContainer>
  );
}

function createTooltip({ code, min }: Currency): string | undefined {
  if (!min) return undefined;
  return code === USD_CODE
    ? "The minimum donation amount is 1 USD"
    : `The minimum donation amount is 1 USD or ${min} ${code.toUpperCase()}`;
}
