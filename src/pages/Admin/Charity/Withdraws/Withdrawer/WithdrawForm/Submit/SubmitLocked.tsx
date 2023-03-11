import { WithdrawValues as WV } from "../types";
import { EndowmentDetails } from "types/contracts";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "../Warning";
import WithdrawButton from "./WithdrawButton";

type Props = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endow_type" | "maturity_time">;
};

export default function SubmitLocked({ isSubmitDisabled, endowment }: Props) {
  if (endowment.endow_type === "charity") {
    return (
      <>
        <Warning classes="-mt-3">
          {`Withdrawing from endowment funds requires ${APP_NAME} team approval.`}
        </Warning>
        <Field<WV>
          name="reason"
          label="Reason"
          classes={{
            container: "field-admin",
            label: "font-bold font-work text-base",
          }}
        />
        <WithdrawButton disabled={isSubmitDisabled} />
      </>
    );
  }

  //normal endowments
  const isMatured =
    (endowment.maturity_time || 0) >= Math.floor(new Date().getTime() / 1000);
  return (
    <>
      {!isMatured && (
        <Warning classes="-mt-3">
          Withdrawing endowment funds before maturity is not allowed.
        </Warning>
      )}
      <WithdrawButton disabled={!isMatured} />
    </>
  );
}
