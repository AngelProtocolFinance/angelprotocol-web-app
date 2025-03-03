import { valibotResolver } from "@hookform/resolvers/valibot";
import { NativeField as Field, Form } from "components/form";
import { Modal } from "components/modal";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

type Val = [number, number];
interface Init {
  min: number;
  max: number;
}

interface Props {
  value: Val | Init;
  onChange: (value: [number, number]) => void;
  classes?: string;
}

const amnt = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.minValue(0),
  v.transform((x) => +x)
);
const schema = v.pipe(
  v.object({
    min: v.optional(amnt),
    max: v.optional(amnt),
  }),
  v.forward(
    v.partialCheck(
      [["min"], ["max"]],
      ({ min, max }) => (min && max ? min <= max : true),
      "min must be less than or equal to max"
    ),
    ["min"]
  )
);

interface Fv extends v.InferInput<typeof schema> {}
interface FvParsed extends v.InferOutput<typeof schema> {}

export function RangeFilter(props: Props) {
  const [open, setOpen] = useState(false);
  const isInit = !props.value || !Array.isArray(props.value);

  const vmin =
    props.value && Array.isArray(props.value)
      ? props.value[0]
      : props.value?.min;
  const vmax =
    props.value && Array.isArray(props.value)
      ? props.value[1]
      : props.value?.max;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Fv>({
    resolver: valibotResolver(schema),
    defaultValues: { min: vmin?.toString(), max: vmax?.toString() },
  });
  return (
    <div className={`flex items-center ${props.classes}`}>
      <button type="button">
        <FilterIcon
          size={16}
          className={`${isInit ? "text-gray-l1" : "text-blue-d1"}`}
        />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        classes="max-w-xl rounded"
      >
        <Form
          onSubmit={handleSubmit((fv) => {
            const { min, max } = fv as FvParsed;

            props.onChange([min, max]);
            setOpen(false);
          })}
          className="rounded p-4"
        >
          <Field label="Min" {...register("min")} error={errors.min?.message} />
          <Field label="Max" {...register("min")} error={errors.max?.message} />
          <button className="btn btn-blue px-4 py-1 text-sm">Apply</button>
        </Form>
      </Modal>
    </div>
  );
}
