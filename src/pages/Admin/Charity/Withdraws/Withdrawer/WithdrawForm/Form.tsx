import ExtLink from "components/ExtLink";
import { Tooltip } from "components/admin";
import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Breakdown from "./Breakdown";
import Network from "./Network";
import Submit from "./Submit";
import Warning from "./Warning";
import useWithdraw from "./useWithdraw";

export default function Form({ classes = "" }) {
  const {
    withdraw,
    chainName,
    tooltip,
    beneficiaryType,
    endowmentType,
    closed,
    closingBeneficiary,
  } = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className={`${classes} flex flex-col gap-6 w-full`}
      noValidate
    >
      <fieldset disabled={!!tooltip} className="contents">
        <Amounts />

        {/** beneficiary is already set on closed accounts */}
        {closed ? (
          <>
            <Warning>This endowment is closed</Warning>
            <div>
              <h5 className="font-bold font-work">
                Beneficiary {closingBeneficiary.type}
              </h5>
              <p>{closingBeneficiary.value}</p>
            </div>
          </>
        ) : (
          <Beneficiary />
        )}

        {/** endowment beneficiaries are bound to polygon only */}
        {beneficiaryType === "wallet" && <Network />}

        {/** fees doesn't apply to DAFs */}
        {endowmentType !== "daf" && <Breakdown />}

        {chainName !== "Polygon" && (
          <Warning>
            Withraws to {chainName} are processed on a hourly basis by our
            cross-chain pipelines.
          </Warning>
        )}

        <Warning classes="-mt-3">
          If withdrawing to an exchange, please ensure you’re using the correct
          blockchain network and currency.{" "}
          <ExtLink
            href="https://intercom.help/angel-giving/en/articles/6628134-how-do-i-remove-usdc-funds-from-my-current-account"
            className="text-blue hover:text-blue-l2 contents"
          >
            More information.
          </ExtLink>
        </Warning>
        {tooltip ? <Tooltip tooltip={tooltip} /> : <Submit />}
      </fieldset>
    </form>
  );
}
