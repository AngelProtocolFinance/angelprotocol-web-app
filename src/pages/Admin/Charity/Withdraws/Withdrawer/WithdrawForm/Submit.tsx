import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "./types";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { Field } from "components/form";
import { APP_NAME } from "constants/common";
import Warning from "./Warning";

export default function Submit() {
  const { endow_type, maturity_time } = useAdminResources<"charity">();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return (
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="btn-orange px-4 py-2 text-sm"
      >
        Create withdraw proposal
      </button>
    );
  }
  //check maturity when locked
  return (
    <SubmitWithReason
      endowment={{ endow_type, maturity_time }}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}

type SubmitWithReasonProps = {
  isSubmitDisabled: boolean;
  endowment: Pick<EndowmentDetails, "endow_type" | "maturity_time">;
};

function SubmitWithReason({
  isSubmitDisabled,
  endowment,
}: SubmitWithReasonProps) {
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
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="btn-orange px-4 py-2 text-sm"
        >
          Create withdraw proposal
        </button>
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
      <button
        type="submit"
        disabled={!isMatured}
        className="mt-2 btn-orange px-4 py-2 text-sm"
      >
        Create withdraw proposal
      </button>
    </>
  );
}
