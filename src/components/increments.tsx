import { Info } from "components/status";
import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";

type Increment = {
  value: string;
  label: string;
};

type F = Increment & { id: string };

interface Props {
  classes?: string;
  countError?: string;
  fields: F[];
  field: (idx: number) => ReactNode;
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}
export function Increments({
  classes = "",
  countError,
  onRemove,
  fields,
  field,
  onAdd,
}: Props) {
  return (
    <div
      className={`${classes} grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2`}
    >
      <div className="flex items-center gap-2 col-span-3">
        <p className="font-bold text-base">Donation increments</p>
        <button type="button" className="text-base font-bold text-green">
          <Plus size={17} strokeWidth={3} onClick={() => onAdd("")} />
        </button>
      </div>
      <p className="text-xs text-red empty:hidden col-span-3">{countError}</p>
      {fields.length > 0 && (
        <div className="grid grid-cols-subgrid col-span-3">
          <div className="text-xs font-bold">Amount</div>
          <div className="text-xs font-bold">Description</div>
        </div>
      )}
      <div className="mt-2 grid grid-cols-subgrid gap-y-6 col-span-3">
        {fields.length === 0 ? (
          <Info classes="col-span-3">
            Click the plus symbol to add preset donation increments for donors
            to choose
          </Info>
        ) : (
          fields.map((f, idx) => {
            return (
              <div
                key={f.id}
                className="grid grid-cols-subgrid col-span-3 items-center grid-rows-[auto_auto]"
              >
                {field(idx)}
                <button
                  tabIndex={-1}
                  className="text-red justify-self-start"
                  type="button"
                  onClick={() => onRemove(idx)}
                >
                  <Minus strokeWidth={3} size={18} />
                </button>
                <div />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
