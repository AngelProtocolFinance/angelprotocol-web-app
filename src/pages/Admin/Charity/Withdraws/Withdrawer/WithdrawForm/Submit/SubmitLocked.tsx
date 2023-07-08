import { FV } from "../types";
import { EndowmentDetails } from "types/contracts";
import { Field } from "components/form";
import { APP_NAME } from "constants/env";
import Warning from "../Warning";
import WithdrawButton from "./WithdrawButton";

type Props = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endowType">;
};

export default function SubmitLocked({ isSubmitDisabled, endowment }: Props) {
  const warning =
    endowment.endowType === "charity"
      ? `Withdrawing from endowment funds requires ${APP_NAME} team approval.`
      : //matured normal endowments can withdraw without warnings
        null;

  return (
    <>
      {warning && <Warning classes="-mt-3">{warning}</Warning>}
      {warning && (
        <Field<FV>
          name="reason"
          label="Reason"
          classes={{
            container: "field-admin",
            label: "font-bold font-work text-base",
          }}
        />
      )}
      <WithdrawButton disabled={isSubmitDisabled} />
    </>
  );
}
