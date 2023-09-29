import ExtLink from "components/ExtLink";
import { Tooltip } from "components/admin";
import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Breakdown from "./Breakdown";
import Network from "./Network";
import SourceEndow from "./SourceEndow";
import Submit from "./Submit";
import Warning from "./Warning";
import useWithdraw from "./useWithdraw";

export default function Form({ classes = "" }) {
  const {
    withdraw,
    chainName,
    tooltip,
    beneficiaryType,
    closed,
    closingBeneficiary,
    isFundsFromClosedEndow,
  } = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className={`${classes} flex flex-col gap-6 w-full`}
      noValidate
    >
      <fieldset disabled={!!tooltip} className="contents">
        {/**
         * If thisEndowment is closed, can't receive deposits even from
         * another closed endowments where thisEndowment is beneficiary of
         */}
        {!closed && <SourceEndow classes="-mt-2 mb-2" />}
        <Amounts
          classes="mb-4"
          //the withdraw should be done in closingBeneficairy's admin/withdraw
          disabled={closed && closingBeneficiary.type === "endowment"}
        />
        {/** beneficiary is already set on closed accounts */}
        {closed ? (
          <Warning>
            This endowment is closed. Only{" "}
            <span className="contents font-work text-orange">
              beneficiary {closingBeneficiary.type}: {closingBeneficiary.value}{" "}
            </span>{" "}
            can withdraw funds.
          </Warning>
        ) : isFundsFromClosedEndow ? null : ( // beneficiary is thisEndowment, when withdrawing from closed endowment, so no need to show beneficiary type selection
          <Beneficiary />
        )}

        {/** endowment beneficiaries are bound to polygon only.
         * When selecting closed endowments as source,
         * beneficiaryType is set to `endowment` */}
        {beneficiaryType === "wallet" && (
          <>
            <Network />
            <Breakdown />
          </>
        )}

        {chainName !== "Polygon" && (
          <Warning>
            Withraws to {chainName} are processed on a hourly basis by our
            cross-chain pipelines.
          </Warning>
        )}

        {beneficiaryType === "wallet" && (
          <Warning classes="-mt-3">
            If withdrawing to an exchange, please ensure you’re using the
            correct blockchain network and currency.{" "}
            <ExtLink
              href="https://intercom.help/angel-giving/en/articles/6628134-how-do-i-remove-usdc-funds-from-my-current-account"
              className="text-blue hover:text-blue-l2 contents"
            >
              More information.
            </ExtLink>
          </Warning>
        )}
        {tooltip ? <Tooltip tooltip={tooltip} /> : <Submit />}
      </fieldset>
    </form>
  );
}
