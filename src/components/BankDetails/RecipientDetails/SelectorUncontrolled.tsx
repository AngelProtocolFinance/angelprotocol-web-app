import { Listbox } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { FocusableInput } from "components/Selector";
import { styles } from "components/Selector/constants";
import { forwardRef } from "react";
import { OptionType, ValKey } from "types/components";

type Props<V extends ValKey> = {
  "aria-invalid"?: boolean;
  id?: string;
  options: OptionType<V>[];
  value?: OptionType<V>;
  onChange: (value: OptionType<V>) => void;
};

const SelectorUncontrolled = forwardRef(function Select<V extends ValKey>(
  props: Props<V>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <Listbox
      onChange={props.onChange}
      value={props.value}
      as="div"
      className="relative"
    >
      <FocusableInput ref={ref} />
      <Listbox.Button
        aria-invalid={props["aria-invalid"]}
        id={props.id}
        as="button"
        className={`${styles.selectorButton} peer-focus:shadow peer-focus:shadow-red`}
      >
        {({ open, value }) => (
          <>
            <span>{value?.label}</span>
            <DrawerIcon
              isOpen={open}
              size={25}
              className="justify-self-end dark:text-gray shrink-0"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className={styles.options}>
        {props.options.map((o) => (
          <Listbox.Option
            key={o.value}
            value={o}
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

export default SelectorUncontrolled;
