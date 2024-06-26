import Icon from "components/Icon";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { unpack } from "helpers/unpack";
import type { ReactNode } from "react";
import type { TDonateMethod } from "types/components";
import type { DonateMethodId } from "types/lists";

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
            updator={(updated) =>
              onChange(values.map((v) => (v.id === updated.id ? updated : v)))
            }
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
      className="flex items-center gap-2 border border-gray-l4 p-3 aria-disabled:bg-gray-l4 aria-disabled:text-gray rounded bg-white select-none"
    >
      <input
        type="checkbox"
        className="accent-blue-d1 size-3.5"
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
        <Icon type="Drag" />
      </button>

      {value.name}
    </Reorder.Item>
  );
}

const names: { [K in DonateMethodId]: string } = {
  crypto: "Crypto",
  daf: "DAF",
  stocks: "Stocks",
  stripe: "Card",
};
const toMethods = (ids: DonateMethodId[], disabled = false): TDonateMethod[] =>
  ids.map((id) => ({
    id,
    name: names[id],
    disabled,
  }));

const all: DonateMethodId[] = ["stripe", "stocks", "daf", "crypto"];
export function fill(sub = all): TDonateMethod[] {
  const existing = sub.filter((x) => all.includes(x));
  const missing = all.filter((x) => !sub.includes(x));
  return toMethods(existing).concat(toMethods(missing, true));
}
