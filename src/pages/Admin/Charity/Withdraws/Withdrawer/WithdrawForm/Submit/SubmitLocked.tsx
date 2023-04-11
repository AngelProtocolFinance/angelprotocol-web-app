import { WithdrawValues as WV } from "../types";
import { EndowmentDetails } from "types/contracts";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "../Warning";
import WithdrawButton from "./WithdrawButton";

type Props = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endow_type">;
};

export default function SubmitLocked({ isSubmitDisabled, endowment }: Props) {
  const note =
    endowment.endow_type === "charity"
      ? `Withdrawing from endowment funds requires ${APP_NAME} team approval.`
      : //matured normal endowments can withdraw without warnings
        null;

  return (
    <>
      {note && <Warning classes="-mt-3">{note}</Warning>}
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
