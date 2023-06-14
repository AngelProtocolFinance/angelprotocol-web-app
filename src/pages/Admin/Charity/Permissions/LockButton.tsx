import { useFormContext } from "react-hook-form";
import { FV, TPermissions } from "./types";

type Props = {
  name: keyof TPermissions;
};

export default function LockButton({ name }: Props) {
  const {
    watch,
    setValue,
    trigger,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const locked = watch(`${name}.locked`);
  const modifiable = getValues(`${name}.modifiable`);

  if (!modifiable) {
    return (
      <button
        disabled={true}
        className="text-gray-d1 dark:text-gray uppercase text-xs bg-gray-l2 dark:bg-blue-gray-d2 rounded-sm px-2 py-1"
      >
        Locked
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${
        locked ? "btn-orange" : "btn-red"
      } py-2 lg:py-1 px-2 font-semibold text-xs uppercase tracking-wider`}
      disabled={isSubmitting}
      onClick={async () => {
        const prevLocked = getValues(`${name}.locked`);
        const isValid = prevLocked ? true : await trigger(`${name}.addr`);
        if (!isValid) return;
        setValue(`${name}.locked`, !locked);
      }}
    >
      {locked ? "Unlock" : "Lock"}
    </button>
  );
}
