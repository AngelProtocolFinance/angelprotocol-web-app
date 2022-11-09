import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { UNSDG_NUMS } from "types/lists";
import { useGetter, useSetter } from "store/accessors";
import { setSdgs } from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";
import { Checkbox, Drawer } from "../common";

type Props = {
  num: number;
  members: UNSDG_NUMS[];
  title: string;
};

export default function Group({ num, members, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { sdgs } = useGetter((state) => state.component.marketFilter);
  const selected = sdgs[num];
  const dispatch = useSetter();

  const isAllSelected = selected.length === members.length;

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function toggleGroup() {
    dispatch(setSdgs({ group: num, sdgs: isAllSelected ? [] : members }));
  }

  return (
    <Listbox
      as="div"
      className="py-1 pr-3"
      multiple
      value={selected}
      onChange={(val: number[]) => {
        dispatch(setSdgs({ group: num, sdgs: val }));
      }}
    >
      <div className="flex items-center gap-2">
        <button onClick={toggleGroup}>
          <Checkbox checked={isAllSelected} classes="top-0.5" />
        </button>
        <Drawer isOpen={isOpen} toggle={toggle}>
          <span className="font-bold text-sm">{title}</span>
        </Drawer>
      </div>

      {isOpen && (
        <Listbox.Options static className="pl-4 py-4 grid gap-4">
          {members.map((m) => (
            <Listbox.Option
              value={m}
              key={m}
              className="gap-1 text-sm cursor-pointer"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} classes="mr-4 top-[3px]" />
                  SDG #{m} : {unsdgs[m].title}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}
