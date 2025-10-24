import { Field, Label, Switch } from "@headlessui/react";

interface Props {
  classes?: string;
  checked: boolean;
  checked_changed: (checked: boolean) => void;
}

export function CpfToggle({ classes = "", checked, checked_changed }: Props) {
  return (
    <Field
      className={`group ${classes} gap-x-1 flex items-center text-sm justify-self-start`}
    >
      <Switch
        checked={checked}
        onChange={(x) => checked_changed(x)}
        className="group relative text-xs flex items-center h-[1lh] w-8 cursor-pointer rounded-full bg-gray-l3 p-1 ease-in-out data-checked:bg-(--accent-primary)"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-[0.8lh] aspect-square -translate-x-0.5 rounded-full bg-white transition-transform ease-in-out group-data-checked:translate-x-3.5"
        />
      </Switch>
      <Label className="whitespace-nowrap">Cover processing fee</Label>
    </Field>
  );
}
