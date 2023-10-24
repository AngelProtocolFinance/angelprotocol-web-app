import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { chains } from "constants/chains-v2";
import { appRoutes } from "constants/routes";
import { Selector } from "../../../../Selector";
import Split from "../../../../Split";
import TokenField from "../../../../TokenField";
import { CheckField } from "../../../../form";
import AdvancedOptions from "../../../AdvancedOptions";
import { initToken } from "../constants";

type Props = {
  configFromWidget: DonaterConfigFromWidget | null;
};

export default function Form({ configFromWidget }: Props) {
  const {
    watch,
    reset,
    resetField,
    handleSubmit,
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

  const token = watch("token");
  const chainId = watch("chainId");
  const isStepOneCompleted = !!token.amount;
  const isInsideWidget = configFromWidget !== null;

  useEffect(() => {
    resetField("token", { defaultValue: initToken });
  }, [chainId, resetField]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <label htmlFor="chainId" className="mb-1 font-bold text-lg">
        Select network :
      </label>
      <Selector<DonateValues, "chainId", string>
        name="chainId"
        options={Object.entries(chains).map(([, chain]) => ({
          label: chain.name,
          value: chain.id,
        }))}
        classes={{ container: "bg-white dark:bg-blue-d6 mb-8" }}
      />

      <TokenField<DonateValues, "token">
        name="token"
        selectedChainId={chainId.value}
        withBalance
        label={`Enter the donation amount:`}
        classes={{ label: "text-lg", inputContainer: "dark:bg-blue-d6" }}
        withMininum
      />

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
        display={configFromWidget?.advancedOptionsDisplay ?? "collapsed"}
        splitComponent={
          <Split<DonateValues, "pctLiquidSplit">
            className="mb-6"
            liqPctField="pctLiquidSplit"
            token={{ amount: toNumber(token.amount), symbol: token.symbol }}
            fixLiquidSplitPct={configFromWidget?.liquidSplitPct}
          />
        }
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

const toNumber = (input: string) => {
  const num = Number(input);
  return isNaN(num) ? 0 : num;
};
