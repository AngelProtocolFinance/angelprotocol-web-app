import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { unpack } from "helpers/unpack";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";
import type { TDonateMethod } from "types/components";

type Updator = (methods: TDonateMethod[]) => void;
type Classes = {
  container?: string;
  label?: string;
  tooltip?: string;
};

type Props = {
  values: TDonateMethod[];
  onChange: Updator;
  error?: ReactNode;
  classes?: Classes | string;
};

export function DonateMethods({ values, onChange, error, classes }: Props) {
  const style = unpack(classes);
  return (
    <div className={style.container}>
      <label className={`${style.label} mb-2 block`}>
        Customize donation payment options
      </label>
      <p className={`text-navy-l1 ${style.tooltip} mb-4`}>
        Here you can turn on/off payment options and change the order of their
        appearance
      </p>
      {error}
      <Reorder.Group
        axis="y"
        onReorder={(values) => onChange(values.map((v) => JSON.parse(v)))}
        values={values.map((v) => JSON.stringify(v))}
        className="grid gap-4"
      >
        {values.map((v) => (
          <Method
            value={v}
            key={v.id}
            updator={(updated) => {
              const _methods = values.map((v) => {
                if (v.id === updated.id) return updated;

                //if DAF is enabled, also enable card + lock
                if (
                  updated.id === "daf" &&
                  !updated.disabled &&
                  v.id === "stripe"
                ) {
                  return { ...v, disabled: false, locked: true };
                }

                //if DAF is disabled, remove lock from card
                if (
                  updated.id === "daf" &&
                  updated.disabled &&
                  v.id === "stripe"
                ) {
                  return { ...v, locked: false };
                }

                return v;
              });

              onChange(_methods);
            }}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}

function Method({
  value,
  updator,
}: {
  value: TDonateMethod;
  updator: (old: TDonateMethod) => void;
}) {
  const y = useMotionValue(0);
  const controls = useDragControls();
  return (
    <Reorder.Item
      aria-disabled={value.disabled}
      value={JSON.stringify(value)}
      dragListener={false}
      dragControls={controls}
      id={value.id}
      style={{ y }}
      className="flex items-center gap-2 border border-gray-l4 p-3 aria-disabled:bg-gray-l4 aria-disabled:text-gray rounded-sm bg-white select-none"
    >
      <input
        type="checkbox"
        className="accent-blue-d1 size-3.5"
        disabled={value.locked}
        checked={!value.disabled}
        onChange={(e) => {
          updator({ ...value, disabled: !e.target.checked });
        }}
      />
      <button
        type="button"
        className="text-xl disabled:pointer-events-none cursor-grab disabled:cursor-default"
        onPointerDown={(e) => controls.start(e)}
        disabled={value.disabled}
      >
        <GripVertical size={20} />
      </button>

      <div>
        <span>{value.name}</span>
        <span className="text-gray-l1 text-sm ml-2">{value.tooltip}</span>
      </div>
    </Reorder.Item>
  );
}
