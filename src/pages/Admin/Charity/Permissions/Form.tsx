import { ErrorMessage } from "@hookform/error-message";
import { getTypedKeys } from "helpers";
import MobileTable from "./MobileTable";
import Table from "./Table";
import useSubmit from "./useSubmit";

export default function Form() {
  const { disabled, errors, reset, submit } = useSubmit();

  const errorName = getTypedKeys(errors).find((errKey) => !!errors[errKey]);

  return (
    <form className="grid gap-6 w-full" onSubmit={submit} onReset={reset}>
      <Table className="max-lg:hidden" disabled={disabled} />
      <MobileTable className="lg:hidden" disabled={disabled} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="reset"
          disabled={disabled}
          className="btn-outline-filled py-2 px-8 rounded"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="btn-orange py-2 px-8 rounded"
        >
          Submit changes
        </button>
        {errorName && (
          <ErrorMessage
            errors={errors}
            name={`${errorName}.delegate_address`}
            as="span"
            className="field-error static text-sm"
          />
        )}
      </div>
    </form>
  );
}
