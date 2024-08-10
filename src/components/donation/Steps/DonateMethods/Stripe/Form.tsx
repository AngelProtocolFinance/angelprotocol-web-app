import CurrencySelector from "components/CurrencySelector";
import QueryLoader from "components/QueryLoader";
import { Form as FormContainer, NativeField } from "components/form";
import { bgCookies, setCookie } from "helpers/cookie";
import { useFiatCurrenciesQuery } from "services/apes";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { Currency } from "types/components";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { ProgramSelector } from "../../common/ProgramSelector";
import { USD_CODE } from "../../common/constants";
import { nextFormState } from "../helpers";
import Frequency from "./Frequency";
import Incrementers from "./Incrementers";
import type { FormProps, Props } from "./types";
import { useRhf } from "./useRhf";

export default function Loader(props: Props) {
  const user = useGetter((state) => state.auth.user);
  const query = useFiatCurrenciesQuery(
    userIsSignedIn(user) ? user.prefCurrencyCode : undefined
  );
  return (
    <QueryLoader
      queryState={query}
      messages={{
        loading: "loading donate form",
        error: "failed to load donate form",
      }}
    >
      {(data) => <Form {...props} {...data} />}
    </QueryLoader>
  );
}

function Form({ currencies, defaultCurr, ...props }: FormProps) {
  const { setState } = useDonationState();

  const rhf = useRhf({ ...props, defaultCurr });

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
        currencies={currencies}
        label="Currency"
        onChange={(c) => {
          setCookie(bgCookies.prefCode, c.code.toUpperCase());
          rhf.currency.onChange(c);
        }}
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
        />
      )}

      {(props.init.recipient.progDonationsAllowed ?? true) && (
        <ProgramSelector
          classes="mt-4"
          endowId={props.init.recipient.id}
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
