import { useFormContext } from "react-hook-form";
import { FormValues, UpdateableFormValues } from "./schema";

type Props = {
  disabled: boolean;
  name: keyof UpdateableFormValues;
};

export default function LockButton(props: Props) {
  const { watch, setValue, getValues } = useFormContext<FormValues>();
  const locked = watch(`${props.name}.locked`);
  const modifiable = getValues(`${props.name}.modifiable`);

  if (!modifiable) {
    return <p className="text-gray-d1 dark:text-gray">Locked</p>;
  }

  return (
    <button
      type="button"
      className={`${
        locked ? "btn-orange" : "btn-red"
      } py-2 lg:py-1 px-2 font-semibold text-xs uppercase tracking-wider`}
      disabled={props.disabled}
      onClick={() => setValue(`${props.name}.locked`, !locked)}
    >
      {locked ? "Unlock" : "Lock"}
    </button>
  );
}
