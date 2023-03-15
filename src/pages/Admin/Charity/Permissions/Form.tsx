import MobileTable from "./MobileTable";
import Table from "./Table";
import useSubmit from "./useSubmit";

export default function Form({ disabled = false }) {
  const { isSubmitting, reset, submit } = useSubmit();

  const isDisabled = disabled || isSubmitting;

  return (
    <form
      className="grid gap-6 w-full"
      onSubmit={submit}
      onReset={() => reset()}
    >
      <Table className="max-md:hidden" disabled={isDisabled} />
      <MobileTable className="md:hidden" disabled={isDisabled} />

      <div className="flex gap-3">
        <button
          type="reset"
          disabled={isDisabled}
          className="btn-outline-filled py-2 px-8 rounded"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isDisabled}
          className="btn-orange py-2 px-8 rounded"
        >
          Submit changes
        </button>
      </div>
    </form>
  );
}
