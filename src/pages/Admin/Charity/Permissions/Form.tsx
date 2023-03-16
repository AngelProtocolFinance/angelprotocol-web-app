import MobileTable from "./MobileTable";
import Table from "./Table";
import useSubmit from "./useSubmit";

export default function Form() {
  const { disabled, reset, submit } = useSubmit();

  return (
    <form
      className="grid gap-6 w-full"
      onSubmit={submit}
      onReset={() => reset()}
    >
      <Table className="max-md:hidden" disabled={disabled} />
      <MobileTable className="md:hidden" disabled={disabled} />

      <div className="flex gap-3">
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
      </div>
    </form>
  );
}
