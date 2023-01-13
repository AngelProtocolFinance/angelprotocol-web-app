import { useFormContext } from "react-hook-form";
import { FilterFormValues } from "./types";

export default function Controls({ classes = "" }) {
  const {
    formState: { isDirty },
  } = useFormContext<FilterFormValues>();
  return (
    <div
      className={`${classes} flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5`}
    >
      <button type="reset" className="text-orange underline">
        Reset filters
      </button>
      <button
        type="submit"
        disabled={!isDirty}
        className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
      >
        Apply filter
      </button>
    </div>
  );
}
