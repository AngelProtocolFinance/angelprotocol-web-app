import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { TokenWithAmount } from "types/slices";
import { DonaterConfigFromWidget } from "types/widget";
import CountrySelector from "components/CountrySelector";
import { Info } from "components/Status";
import TokenField from "components/TokenField";
import { CheckField, Label } from "components/form";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { PAYMENT_WORDS } from "constants/common";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";

type Props = {
  configFromWidget: DonaterConfigFromWidget | null;
  tokens: TokenWithAmount[];
};

export default function Form({ configFromWidget, tokens }: Props) {
  const {
    reset,
    resetField,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();
  const endowId = useGetter((state) => state.donation.recipient?.id);
  const isKYCRequired = useGetter(
    (state) => state.donation.recipient?.isKYCRequired
  );

  const dispatch = useDispatch();

  function submit(data: DonateValues) {
    dispatch(setDetails(data));
    reset();
  }

  const tokenType = watch("token.type");
  const isStepOneCompleted = !!getValues("token.amount");
  const isInsideWidget = configFromWidget !== null;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      {tokens.length > 0 ? (
        <TokenField<DonateValues, "token">
          name="token"
          tokens={tokens}
          withGiftcard
          withBalance
          label={`Enter the ${PAYMENT_WORDS.noun.singular} amount:`}
          classes={{ label: "text-lg", inputContainer: "dark:bg-blue-d6" }}
          withMininum
        />
      ) : (
        <Info classes="mb-6">
          Endowment doesn't accept donations on this network
        </Info>
      )}

      {tokenType === "fiat" && (
        <>
          <h4 className="font-bold text-sm mb-2 mt-4">
            Enter your payment details:
          </h4>
          <Label className="mb-2" htmlFor="country">
            Country of Residence *
          </Label>
          <CountrySelector<DonateValues, "country">
            placeholder="Select a country"
            fieldName="country"
            onReset={() => resetField("country")}
            classes={{
              container: "px-4 dark:bg-blue-d6 mb-3",
              input: "py-3.5 placeholder:text-sm",
              error: "field-error",
            }}
          />
        </>
      )}

      {!isKYCRequired && (
        // if KYC is required, KYC form is automatically shown on next step
        <CheckField<DonateValues>
          name="userOptForKYC"
          classes={{
            container: "text-sm",
            error: "mt-2",
          }}
        >
          Please send me a tax receipt
        </CheckField>
      )}

      <AdvancedOptions
        classes="mt-10"
        display={configFromWidget?.advancedOptionsDisplay ?? "expanded"}
        fixLiquidSplitPct={configFromWidget?.liquidSplitPct}
      />

      <div
        className={`flex gap-3 md:gap-5 ${
          isInsideWidget ? "justify-center" : "justify-between"
        } font-body mt-8 md:mt-12`}
      >
        {!isInsideWidget && (
          <Link
            className="btn-outline-filled btn-donate w-1/2"
            to={`${appRoutes.marketplace}/${endowId}`}
          >
            Cancel
          </Link>
        )}
        <button
          className="btn-orange btn-donate w-1/2"
          // * make sure that fields doesn't make form dirty on initial load
          // * isStepOneCompleted, when user goes back to step 1 (filled out previously)
          disabled={
            !isValid || isSubmitting || !(isDirty || isStepOneCompleted)
          }
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
