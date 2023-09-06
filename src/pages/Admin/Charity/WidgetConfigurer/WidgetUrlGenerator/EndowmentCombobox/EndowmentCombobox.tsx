import { useFormContext } from "react-hook-form";
import { FormValues } from "../../schema";
import Combobox from "./Combobox";

export default function EndowmentCombobox() {
  const {
    formState: { defaultValues },
    watch,
  } = useFormContext<FormValues>();

  /* ID from defaultValues is the URL param endow ID*/
  if (defaultValues?.endowment?.id !== 0) {
    return (
      <span className="text-base font-bold mb-3">
        {watch("endowment.name") || "Endowment name is loading..."}
      </span>
    );
  }

  return <Combobox />;
}
