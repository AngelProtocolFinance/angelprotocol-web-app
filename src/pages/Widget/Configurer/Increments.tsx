import Icon from "components/Icon";
import { Info } from "components/Status";
import type { ReactNode } from "react";
import type { FieldArrayWithId } from "react-hook-form";
import type { WidgetConfig } from "types/widget";

type F = FieldArrayWithId<WidgetConfig, "increments", "id">;

interface Props {
  classes?: string;
  countError?: string;
  fields: F[];
  field: (idx: number) => ReactNode;
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}
export default function Increments({
  classes = "",
  countError,
  onRemove,
  fields,
  field,
  onAdd,
}: Props) {
  return (
    <div className={`${classes} grid`}>
      <div className="flex items-center gap-2">
        <p className="font-bold text-base">Donation increments</p>
        <button type="button" className="text-base font-bold text-green">
          <Icon
            type="Plus"
            size={17}
            strokeWidth={3}
            onClick={() => onAdd("0")}
          />
        </button>
      </div>
      <p className="text-xs text-red empty:hidden">{countError}</p>
      <div className="mt-4 grid gap-y-6">
        {fields.length === 0 ? (
          <Info>Default preset $40, $100, $200 are used </Info>
        ) : (
          fields.map((f, idx) => {
            return (
              <div key={f.id} className="flex items-center gap-2">
                {field(idx)}
                <button
                  tabIndex={-1}
                  className="text-red"
                  type="button"
                  onClick={() => onRemove(idx)}
                >
                  <Icon strokeWidth={3} type="Dash" size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
