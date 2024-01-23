import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { ChainID } from "types/chain";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { chainList } from "constants/chains";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { Selector } from "../../../../../Selector";
import Split from "../../../../../Split";
import TokenField from "../../../../../TokenField";
import { CheckField, Label } from "../../../../../form";
import AdvancedOptions from "../../../../AdvancedOptions";
import { initToken } from "../constants";

type Props = {
  configFromWidget: DonaterConfigFromWidget | null;
};

export default function Form({ configFromWidget }: Props) {
  const { watch, reset, setValue, handleSubmit } =
    useFormContext<DonateValues>();
  const endowId = useGetter((state) => state.donation.recipient?.id);
  const isKYCRequired = useGetter(
    (state) => state.donation.recipient?.isKYCRequired
  );

  const dispatch = useDispatch();

  function submit(data: DonateValues) {
    dispatch(setDetails({ ...data, method: "crypto" }));
    reset();
  }

  const token = watch("token");
  const chainId = watch("chainId");
  const isInsideWidget = configFromWidget !== null;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <Label htmlFor="chainId" className="mb-1 font-bold" required>
        Network
      </Label>
      <Selector<DonateValues, "chainId", ChainID>
        name="chainId"
        options={chainList
          .filter((chain) => chain.isTest === IS_TEST)
          .map(({ name, id }) => ({
            label: name,
            value: id,
          }))}
        onOptionChange={() => {
          setValue("token", initToken);
          setValue("token.amount", "0");
        }}
        classes={{ container: "bg-white dark:bg-blue-d6 mb-8" }}
      />

      <TokenField<DonateValues, "token">
        name="token"
        selectedChainId={chainId.value}
        withBalance
        label={`Donation amount`}
        classes={{ label: "text-sm", inputContainer: "dark:bg-blue-d6" }}
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
        <button className="btn-orange btn-donate w-1/2" type="submit">
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
