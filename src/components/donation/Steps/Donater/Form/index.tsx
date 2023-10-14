import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { ConnectedWallet } from "types/wallet";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { chains } from "constants/chains-v2";
import { appRoutes } from "constants/routes";
import { Selector } from "../../../../Selector";
import Split from "../../../../Split";
import TokenField from "../../../../TokenField";
import { CheckField, Label } from "../../../../form";
import AdvancedOptions from "../../../AdvancedOptions";

type Props = {
  configFromWidget: DonaterConfigFromWidget | null;
  wallet: ConnectedWallet;
};

export default function Form({ configFromWidget, wallet }: Props) {
  const {
    watch,
    reset,
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

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <div>
        <span>wallet: {wallet.address}</span>
        <button onClick={wallet.disconnect} type="button">
          disconnect
        </button>
      </div>
      <Label htmlFor="chainId" className="mb-2" required={false}>
        Blockchain
      </Label>
      <Selector<DonateValues, "chainId", string>
        name="chainId"
        options={Object.entries(chains).map(([, chain]) => ({
          label: chain.name,
          value: chain.id,
        }))}
        classes={{ container: "bg-white dark:bg-blue-d6 mb-6" }}
      />

      <TokenField<DonateValues, "token">
        name="token"
        selectedChainId={chainId.value}
        userWalletAddress={wallet.address}
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
