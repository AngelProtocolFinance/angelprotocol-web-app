import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { unpack } from "helpers";
import { type AriaAttributes, forwardRef } from "react";
import type { OptionType, ValKey } from "types/components";
import FocusableInput from "./FocusableInput";
import { styles } from "./constants";
import type { Classes } from "./types";

type Props<V extends ValKey> = {
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  disabled?: boolean;
  id?: string;
  options?: OptionType<V>[];
  classes?: Classes;
  value?: V;
  onChange: (value: V) => void;
};

export const NativeSelect = forwardRef(function Select<V extends ValKey>(
  props: Props<V>,
  ref: React.Ref<HTMLInputElement>
) {
  const cls = unpack(props.classes);
  return (
    <Listbox
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
      as="div"
      className="relative"
    >
      <FocusableInput ref={ref} />
      <ListboxButton
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
      </ListboxButton>
      <ListboxOptions className={`${styles.options} ${cls.options}`}>
        {(props.options ?? []).map((o) => (
          <ListboxOption
            key={o.value}
            value={o.value}
            className={styles.option}
          >
            {o.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
});
