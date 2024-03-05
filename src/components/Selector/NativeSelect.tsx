import { Listbox } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { AriaAttributes, forwardRef } from "react";
import { OptionType, ValKey } from "types/components";
import FocusableInput from "./FocusableInput";
import { styles } from "./constants";

type Props<V extends ValKey> = {
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  disabled?: boolean;
  id?: string;
  options?: OptionType<V>[];
  value?: V;
  onChange: (value: V) => void;
};

export const NativeSelect = forwardRef(function Select<V extends ValKey>(
  props: Props<V>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <Listbox
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
      as="div"
      className="relative"
    >
      <FocusableInput ref={ref} />
      <Listbox.Button
        aria-invalid={props["aria-invalid"]}
        aria-disabled={props.disabled}
        id={props.id}
        as="button"
        className={`${styles.selectorButton} peer-focus:shadow peer-focus:shadow-red`}
      >
        {({ open, value }) => (
          <>
            <span>{props.options?.find((o) => o.value === value)?.label}</span>
            <DrawerIcon
              isOpen={open}
              size={25}
              className="justify-self-end dark:text-navy-l2 shrink-0"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className={styles.options}>
        {(props.options ?? []).map((o) => (
          <Listbox.Option
            key={o.value}
            value={o.value}
            className={({ active, selected }) =>
              styles.option(selected, active)
            }
          >
            {o.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
});
