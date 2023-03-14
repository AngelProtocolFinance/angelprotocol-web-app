import MobileTable from "./MobileTable";
import Table from "./Table";
import useSubmit from "./useSubmit";

export default function Form() {
  const { isSubmitting, modifiable, reset, submit } = useSubmit();

  return (
    <form onSubmit={submit} onReset={() => reset()}>
      <fieldset
        className="grid gap-6 w-full"
        disabled={isSubmitting || !modifiable}
      >
        <Table className="max-md:hidden" />
        <MobileTable className="md:hidden" />

        <div className="flex gap-3">
          <button type="reset" className="btn-outline-filled py-2 px-8 rounded">
            Reset
          </button>
          <button type="submit" className="btn-orange py-2 px-8 rounded">
            Submit changes
          </button>
        </div>
      </fieldset>
    </form>
  );
}
