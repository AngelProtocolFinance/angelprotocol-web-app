import Icon from "components/Icon";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import type { Method as TMethod } from "types/widget";

type Updator = (methods: TMethod[]) => void;

type Props = {
  values: TMethod[];
  onChange: Updator;
};

export function DonateMethods({ values, onChange }: Props) {
  return (
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
          updator={(updated) =>
            onChange(values.map((v) => (v.id === updated.id ? updated : v)))
          }
        />
      ))}
    </Reorder.Group>
  );
}

function Method({
  value,
  updator,
}: {
  value: TMethod;
  updator: (old: TMethod) => void;
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
      className="flex items-center gap-2 border border-gray-l4 p-3 aria-disabled:bg-gray-l4"
    >
      <input
        type="checkbox"
        className="accent-blue-d1 size-4"
        checked={!value.disabled}
        onChange={(e) => {
          updator({ ...value, disabled: !e.target.checked });
        }}
      />
      <button
        type="button"
        className="disabled:pointer-events-none"
        onPointerDown={(e) => controls.start(e)}
        disabled={value.disabled}
      >
        <Icon type="Menu" />
      </button>

      {value.name}
    </Reorder.Item>
  );
}
