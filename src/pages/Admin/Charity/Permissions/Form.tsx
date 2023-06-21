import { FormHTMLAttributes } from "react";
import PermissionsTable from "./PermissionsTable";
import useSubmit from "./useSubmit";

export default function Form(
  props: FormHTMLAttributes<HTMLFormElement> & { tooltip?: string }
) {
  const { isSubmitting, reset, submit } = useSubmit();

  return (
    <form className="grid gap-6 w-full" onSubmit={submit}>
      <fieldset className="contents" disabled={!!props["aria-disabled"]}>
        <PermissionsTable />
        {!props["aria-disabled"] && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              disabled={isSubmitting}
              className="btn-outline-filled py-2 px-8 rounded"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-orange py-2 px-8 rounded"
            >
              Submit changes
            </button>
          </div>
        )}
      </fieldset>
    </form>
  );
}
