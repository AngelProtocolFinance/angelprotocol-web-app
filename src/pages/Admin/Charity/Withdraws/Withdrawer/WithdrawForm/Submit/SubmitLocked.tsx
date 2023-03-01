import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "../types";
import { EndowmentDetails } from "types/contracts";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "../Warning";
import WithdrawButton from "./WithdrawButton";

type Props = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endow_type" | "maturity_height">;
  height: number;
};

export default function SubmitLocked({
  height = 0,
  isSubmitDisabled,
  endowment,
}: Props) {
  const { setValue } = useFormContext<WV>();

  useEffect(() => {
    //set to activate reason validation
    setValue("height", height);
  }, [height, setValue]);

  if (endowment.endow_type === "Charity") {
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
  const isMatured = height >= (endowment.maturity_height || 0);
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
