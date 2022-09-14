import { ButtonHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { useAdminResources } from "pages/Admin/Guard";
import { useEndowmentQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";

export default function Submit() {
  const { endowmentId } = useAdminResources();
  const {
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<WithdrawValues>();
  const queryState = useEndowmentQuery({ id: endowmentId });
  const type = getValues("type");

  if (type === "liquid") {
    return (
      <Button type="submit" disabled={isValid || !isDirty}>
        create withdraw proposal
      </Button>
    );
  }
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Getting authorization info",
        error: "Failed to get authorization info",
      }}
    >
      {() => {
        return (
          <Button type="submit" disabled={isValid || !isDirty}>
            create withdraw proposal
          </Button>
        );
      }}
    </QueryLoader>
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
