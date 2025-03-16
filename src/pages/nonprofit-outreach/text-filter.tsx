import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
} from "components/form";
import { ListFilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface Props {
  label: string;
  _key: string;
  num: number;
  values?: (k: string) => string[];
  onChange?: (values: string[], k: string) => void;
  classes?: string;
}

export function TextFilter(props: Props) {
  const raw = props.values?.(props._key) || [];
  const is_active = raw.length > 0;
  const is_blank = raw.includes("blank");
  const is_exists = raw.includes("exists");
  const texts = raw.filter((text) => text !== "blank" && text !== "exists");

  const { register, handleSubmit, reset } = useForm({
    values: {
      blank: is_blank,
      exists: is_exists,
      ...texts.reduce((acc, t, idx) => ({ ...acc, [`text${idx}`]: t }), {}),
    },
  });
  return (
    <Popover className="relative flex items-start justify-between gap-x-2">
      <p>{props.label}</p>
      <PopoverButton className="mt-1">
        <ListFilterIcon
          size={14}
          className={`${is_active ? "text-green stroke-3" : ""}`}
        />
      </PopoverButton>
      <PopoverPanel
        as="form"
        anchor={{ to: "bottom", gap: 8 }}
        className="bg-white w-max border border-gray-l3 p-2 grid rounded-sm gap-2"
        onReset={(e) => {
          e.preventDefault();
          reset({
            blank: false,
            exists: false,
          });
          props.onChange?.([], props._key);
        }}
        onSubmit={handleSubmit(({ blank, exists, ...texts }) => {
          const text = Object.values(texts) as string[];
          const vals = text
            .concat([blank ? "blank" : "", exists ? "exists" : ""])
            .filter((x) => x);
          props.onChange?.(vals, props._key);
        })}
      >
        <CheckField {...register("blank")}>Blank</CheckField>
        <CheckField {...register("exists")} classes="mb-2">
          Exists
        </CheckField>
        {Array.from({ length: props.num }, (_, i) => (
          <Field
            key={i}
            {...register(`text${i}` as any)}
            label=""
            classes={{ input: "text-xs py-1 px-2" }}
          />
        ))}
        <div className="flex justify-end space-x-2 mt-4">
          <button type="reset" className="btn btn-outline text-xs px-2 py-1">
            clear
          </button>
          <button type="submit" className="btn btn-blue text-xs px-2 py-1">
            apply
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
