import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiatDonateValues } from "../types";
import { WithWallet } from "contexts/WalletContext";
import CountrySelector from "components/CountrySelector";
import { Field, Label } from "components/form";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { humanize } from "helpers";
import { appRoutes } from "constants/routes";
import getBreakdown from "./getBreakdown";

export default function Form(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  const { token } = props.details;
  const { id: endowId } = props.recipient;
  const { fromBal, fromGift } = getBreakdown(token);
  const { handleSubmit, resetField } = useFormContext<FiatDonateValues>();

  function submit(data: FiatDonateValues) {}

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid gap-4 rounded-md w-full"
      autoComplete="off"
    >
      {/* <h4 className="font-bold text-sm">Choose payment method:</h4>
      <div className="flex">
        <PaymentOption option="ACH Transfer" />
        <PaymentOption option="SEPA" />
      </div>
      <div className="flex">
        <PaymentOption option="Wire Transfer" />
        <PaymentOption option="Credit/Debit Card" />
      </div> */}
      <h4 className="font-bold text-sm">Enter your payment details:</h4>

      {/* <Field<FiatDonateValues>
        name="name"
        label="Name on card"
        placeholder="e.g. John Doe"
        required
      />
      <div className="flex gap-5">
        <Field<FiatDonateValues>
          name="cardNumber"
          label="Card number"
          placeholder="xxxx xxxx xxxx xxxx"
          required
          classes={{ container: "w-3/5" }}
        />
        <Field<FiatDonateValues>
          name="expiryDate"
          label="Expiry Date"
          placeholder="MM / YY"
          required
          classes={{ container: "w-1/5" }}
        />
        <Field<FiatDonateValues>
          name="cvv"
          label="CVV"
          placeholder="xxx"
          required
          classes={{ container: "w-1/5" }}
        />
      </div> */}
      <div className="flex-col">
        <Label className="mb-2" htmlFor="country">
          Country
        </Label>
        <CountrySelector<FiatDonateValues, "country">
          placeholder="Select a country"
          fieldName="country"
          onReset={() => resetField("country")}
          classes={{
            container: "px-4 bg-gray-l5 dark:bg-blue-d6",
            input: "py-3.5 placeholder:text-sm",
            error: "field-error",
          }}
        />
      </div>

      <div className="grid content-start">
        <Row title="Currency:">
          <img
            alt=""
            className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
            src={token.logo}
          />
          <span>{token.symbol}</span>
        </Row>
        <Row title="Amount:">
          <span>
            {token.symbol} {humanize(fromBal, 2)}
          </span>
        </Row>
        {fromGift ? (
          <Row title="Giftcard:">
            {token.symbol} {humanize(fromGift, 4)}
          </Row>
        ) : null}
        <Row title="Transaction Cost:">
          <span>{token.symbol} 5.00</span>
        </Row>
        <Row title="TOTAL">
          <span>
            {token.symbol} {humanize(fromGift + 5, 2)}
          </span>
        </Row>
        <div className="mt-14 grid grid-cols-2 gap-5">
          <button
            className="btn-outline-filled btn-donate"
            onClick={goBack}
            type="button"
          >
            Back
          </button>
          <button className="btn-orange btn-donate" type="submit">
            Make Donation
          </button>
          <Link
            to={appRoutes.profile + `/${endowId}`}
            className="col-span-full btn-outline btn-donate"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}

function Row({
  title,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-prim last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
