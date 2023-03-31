import { useFormContext } from "react-hook-form";
import { FormValues, UpdateableFormValues } from "./schema";

type Props = {
  disabled: boolean;
  name: keyof UpdateableFormValues;
};

export default function LockButton(props: Props) {
  const { setValue, watch } = useFormContext<FormValues>();

  const currModifiable = watch(`${props.name}.modifiableAfterInit`);

  return (
    <button
      type="button"
      /** Color #54595F is hardcoded because this is the only place where it's necessary */
      className={`btn-red ${
        currModifiable ? "" : "bg-[#54595F] hover:bg-gray-d1 active:bg-gray-d2"
      } py-2 lg:py-1 px-2 font-semibold text-xs uppercase tracking-wider`}
      disabled={props.disabled}
      onClick={() =>
        setValue(`${props.name}.modifiableAfterInit`, !currModifiable)
      }
    >
      {currModifiable ? "Lock forever" : "Locked forever"}
    </button>
  );
}
