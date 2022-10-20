export function Checkbox({
  checked,
  classes = "",
}: {
  checked: boolean;
  classes?: string;
}) {
  return (
    <input
      type="checkbox"
      readOnly
      checked={checked}
      className={`inline-block relative appearance-none border border-gray-d1 dark:border-gray-l2 rounded-sm w-4 h-4 shrink-0 checked:bg-blue checked:border-blue dark:checked:bg-blue dark:checked:border-blue ${classes}`}
    />
  );
}
