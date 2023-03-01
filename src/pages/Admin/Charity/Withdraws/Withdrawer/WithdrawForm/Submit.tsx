import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "./types";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useLatestBlockQuery } from "services/juno";
import QueryLoader from "components/QueryLoader";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "./Warning";

export default function Submit() {
  const { endow_type, maturity_height } = useAdminResources<"charity">();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const queryState = useLatestBlockQuery(null);
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return <WithdrawButton disabled={isSubmitDisabled} />;
  }
  //check maturity when locked
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Checking account maturity...",
        error: "Failed to check account maturity",
      }}
    >
      {(height) => (
        <SubmitWithReason
          endowment={{ endow_type, maturity_height }}
          height={+height}
          isSubmitDisabled={isSubmitDisabled}
        />
      )}
    </QueryLoader>
  );
}

type SubmitWithReasonProps = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endow_type" | "maturity_height">;
  height: number;
};

function SubmitWithReason({
  height = 0,
  isSubmitDisabled,
  endowment,
}: SubmitWithReasonProps) {
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

function WithdrawButton({ disabled }: { disabled: boolean }) {
  return (
    <button type="submit" disabled={disabled} className="btn-orange py-3">
      Withdraw
    </button>
  );
}
