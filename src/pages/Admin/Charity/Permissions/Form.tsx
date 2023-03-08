import { useFormContext } from "react-hook-form";
import Table from "./Table";
import { FormValues } from "./schema";

export default function Form() {
  const { handleSubmit, reset } = useFormContext<FormValues>();

  return (
    <form
      className="grid gap-6 w-full"
      onSubmit={handleSubmit((formValues: any) =>
        console.log("formValues", formValues)
      )}
      onReset={() => reset()}
    >
      <Table />

      <div className="flex gap-3">
        <button type="reset" className="btn-outline-filled py-2 px-8 rounded">
          Reset changes
        </button>
        <button type="submit" className="btn-orange py-2 px-8 rounded">
          Submit changes
        </button>
      </div>
    </form>
  );
}
