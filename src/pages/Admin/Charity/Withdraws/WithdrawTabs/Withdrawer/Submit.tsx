import { ButtonHTMLAttributes, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues as WV } from "./types";
import { EndowmentDetails } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useLatestBlockQuery } from "services/juno";
import Icon from "components/Icon";
import { QueryLoader, TextInput } from "components/admin";

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

type SubmitWithReasonProps = {
  isSubmitDisabled: boolean;
  endowment: EndowmentDetails;
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
        <Warning message="Withdrawing from locked funds requires Angel Protocol team approval." />
        <TextInput<WV> name="reason" title="Reason" />
        <Button type="submit" disabled={isSubmitDisabled}>
          Create withdraw proposal
        </Button>
      </>
    );
  }

  //normal endowments
  const isMatured = height >= (endowment.maturity_height || 0);
  return (
    <>
      {!isMatured && (
        <Warning message="Withdrawing locked funds before maturity is not allowed." />
      )}
      <Button type="submit" disabled={!isMatured}>
        Create withdraw proposal
      </Button>
    </>
  );
}

function Warning({ message }: { message: string }) {
  return (
    <p className="p-2 text-sm bg-orange-l5 text-orange-d1 mb-4">
      <Icon type="Info" className="inline-block relative bottom-0.5 mr-1" />
      {message}
    </p>
  );
}

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full py-2 uppercase hover:bg-blue-d1 bg-blue rounded-lg text-white text-sm font-bold disabled:bg-gray mt-4"
    />
  );
}
