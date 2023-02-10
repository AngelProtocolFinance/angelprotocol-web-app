import { Combobox as HuiCombobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { EndowmentIdName } from "types/aws";
import { useLazyProfileQuery } from "services/aws/aws";
import { DrawerIcon } from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import Options from "./Options";

type BaseFormShape = { [index: string]: EndowmentIdName };

export const placeHolderEndowIdName: EndowmentIdName = {
  name: "",
  id: 0,
};

const nameKey: keyof EndowmentIdName = "name";

export default function Combobox<
  T extends FieldValues,
  K extends Path<T>
>(props: {
  fieldName: T[K] extends EndowmentIdName ? K : never;
  onReset?(): void;
  placeholder?: string;
  classes?: {
    container?: string;
    input?: string;
    error?: string;
  };
}) {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<BaseFormShape>();

  const {
    field: { value: endowIdName, onChange, ref },
  } = useController<BaseFormShape>({
    name: props.fieldName,
  });

  const [query, setQuery] = useState(endowIdName.name);

  const [debouncedQuery] = useDebouncer(query, 500);

  const [queryProfile] = useLazyProfileQuery();

  /**
   * some consumers can only store countryName:string
   * in this case, get flag for them when this component loads
   */
  useEffect(() => {
    (async () => {
      if (endowIdName.id && !endowIdName.name) {
        const { data = { id: endowIdName.id, name: "" } } = await queryProfile(
          endowIdName.id
        );
        onChange({ id: data.id, name: data.name });
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <HuiCombobox
      aria-disabled={isSubmitting}
      value={endowIdName}
      onChange={onChange}
      as="div"
      className={`relative items-center grid grid-cols-[1fr_auto] w-full field-container ${
        props.classes?.container || ""
      }`}
    >
      <HuiCombobox.Input
        ref={ref}
        placeholder={props.placeholder}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(country: EndowmentIdName) => country.name}
        className={`pl-4 ${props.classes?.input}`}
      />

      <HuiCombobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={25} className="mx-1" />}
      </HuiCombobox.Button>

      <Options query={debouncedQuery} />

      <ErrorMessage
        errors={errors}
        name={`${props.fieldName}.${nameKey}`}
        as="span"
        className={props.classes?.error}
      />
    </HuiCombobox>
  );
}
