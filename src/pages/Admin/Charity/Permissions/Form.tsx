import Table from "./Table";
import useSubmit from "./useSubmit";

export default function Form() {
  const { isSubmitting, reset, submit } = useSubmit();

  return (
    <form
      className="grid gap-6 w-full"
      onSubmit={submit}
      onReset={() => reset()}
    >
      <Table />

      <div className="flex gap-3">
        <button
          type="reset"
          className="btn-outline-filled py-2 px-8 rounded"
          disabled={isSubmitting}
        >
          Reset changes
        </button>
        <button
          type="submit"
          className="btn-orange py-2 px-8 rounded"
          disabled={isSubmitting}
        >
          Submit changes
        </button>
      </div>
    </form>
  );
}
