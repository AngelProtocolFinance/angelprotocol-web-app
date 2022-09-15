import { ButtonHTMLAttributes, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "./types";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useLatestBlockQuery } from "services/juno";
import Icon from "components/Icon";
import { QueryLoader, TextInput } from "components/admin";
import isNeedApPermission from "./isNeedApPermission";

export default function Submit() {
  const { endowment } = useAdminResources();
  const {
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext<WV>();
  const queryState = useLatestBlockQuery(null);

  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  const type = getValues("type");
  if (type === "liquid") {
    return (
      <Button type="submit" disabled={isSubmitDisabled}>
        Create withdraw proposal
      </Button>
    );
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
          endowment={endowment}
          height={+height}
          isSubmitDisabled={isSubmitDisabled}
        />
      )}
    </QueryLoader>
  );
}

function SubmitWithReason(props: {
  isSubmitDisabled: boolean;
  endowment: EndowmentDetails;
  height: number;
}) {
  const { setValue } = useFormContext<WV>();

  //set reason to required
  useEffect(() => {
    setValue("isReasonRequired", true);
  }, []);

  return (
    <>
      {isNeedApPermission(props.endowment, props.height) && (
        <>
          <p className="p-2 text-sm bg-amber-50 text-amber-600">
            <Icon
              type="Info"
              className="inline-block relative bottom-0.5 mr-1"
            />
            You are proposing to withdrawing locked funds before maturity. Angel
            protocol team will vote to approve this transaction after execution.
          </p>
          <TextInput<WV> name="reason" title="Reason" />
        </>
      )}
      <Button type="submit" disabled={props.isSubmitDisabled}>
        Create withdraw proposal
      </Button>
    </>
  );
}

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full py-2 uppercase hover:bg-blue-accent bg-angel-blue rounded-lg text-white-grey text-sm font-bold disabled:bg-grey-accent mt-4"
    />
  );
}
