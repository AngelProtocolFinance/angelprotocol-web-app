import { Listbox } from "@headlessui/react";
import { memo, useState } from "react";
import { UNSDG_NUMS } from "types/lists";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";

type Props = {
  num: number;
  members: (UNSDG_NUMS | 0)[];
};

export default function Group({ num, members }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { sdgs } = useGetter((state) => state.component.marketFilter);
  const selected = sdgs[num];
  const dispatch = useSetter();

  const isAllSelected = selected.length === members.length;

  function toggleGroup() {
    dispatch(setSdgs({ group: num, sdgs: isAllSelected ? [] : members }));
  }

  return (
    <Listbox
      as="div"
      className="p-1"
      multiple
      value={selected}
      onChange={(val: number[]) => {
        dispatch(setSdgs({ group: num, sdgs: val }));
      }}
    >
      <div className="flex items-center gap-2">
        <button onClick={toggleGroup}>
          <Checkbox checked={isAllSelected} classes="top-[2px]" />
        </button>
        <button
          onClick={() => {
            setIsOpen((p) => !p);
          }}
          className="text-sm font-heading font-semibold flex items-center justify-between w-full"
        >
          <span>Goal group {num}</span>
          <Icon type="ArrowDown" size={18} />
        </button>
      </div>

      {isOpen && (
        <Listbox.Options static className="pl-4 py-4 grid gap-4">
          {members.map((m) => (
            <Listbox.Option
              value={m}
              key={m}
              className="gap-1 font-heading text-sm cursor-pointer"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} classes="mr-4 top-[3px]" />
                  SDG {m} : {m === 0 ? "Uncategorized" : unsdgs[m].title}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}

function Checkbox({
  checked,
  classes = "",
}: {
  checked: boolean;
  classes?: string;
}) {
  return (
    <input
      type="checkbox"
      readOnly
      checked={checked}
      className={`inline-block relative appearance-none border border-gray-d1 rounded-sm w-4 h-4 shrink-0 checked:bg-blue checked:border-blue ${classes}`}
    />
  );
}
