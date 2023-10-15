import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { TokenWithAmount } from "types/tx";
import { DonaterConfigFromWidget } from "types/widget";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import Split from "components/Split";
import TokenField from "components/TokenField";
import ChainSelector from "components/WalletSuite/ConnectedWallet/Details/ChainSelector";
import { CheckField } from "components/form";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { maskAddress } from "helpers";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "../../../AdvancedOptions";

type Props = {
  configFromWidget: DonaterConfigFromWidget | null;
  tokens: TokenWithAmount[];
  wallet: WalletState;
};

export default function Form({ configFromWidget, tokens, wallet }: Props) {
  const {
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();
  const { disconnect } = useSetWallet();
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
  const isStepOneCompleted = !!token.amount;
  const isInsideWidget = configFromWidget !== null;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Icon type="Wallet" className="text-green" />
        <p className="text-sm text-gray-d1 dark:text-gray font-work">
          {maskAddress(wallet.address)}
        </p>
        <button
          type="button"
          onClick={disconnect}
          className="text-xs font-work uppercase px-2 py-1 btn-outline"
        >
          disconnect
        </button>
      </div>

      <label className="font-bold mb-1 text-md">Select network :</label>
      <ChainSelector classes="dark:bg-blue-d6 mb-6" {...wallet} />

      <TokenField<DonateValues, "token">
        name="token"
        tokens={tokens}
        withBalance
        label={`Enter the donation amount :`}
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
