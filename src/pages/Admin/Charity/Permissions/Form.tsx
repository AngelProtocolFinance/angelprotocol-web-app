import { ErrorMessage } from "@hookform/error-message";
import MobileTable from "./MobileTable";
import Table from "./Table";
import { getFieldErrorName } from "./helpers/getFieldErrorName";
import useSubmit from "./useSubmit";

export default function Form() {
  const { isSubmitting, errors, reset, submit } = useSubmit();

  const errorName = getFieldErrorName(errors);

  return (
    <form className="grid gap-6 w-full" onSubmit={submit}>
      <Table className="max-lg:hidden" />
      <MobileTable className="lg:hidden" />

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
        {errorName && (
          <ErrorMessage
            errors={errors}
            name={errorName}
            as="span"
            className="field-error static text-sm"
          />
        )}
      </div>
    </form>
  );
}
