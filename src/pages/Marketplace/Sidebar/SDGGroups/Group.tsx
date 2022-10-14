import { Listbox } from "@headlessui/react";
import { useState } from "react";
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
  console.log(members);

  return (
    <Listbox
      as="div"
      className="p-3"
      multiple
      value={selected}
      onChange={(val: number[]) => {
        dispatch(setSdgs({ group: num, sdgs: val }));
      }}
    >
      <Listbox.Button
        onClick={() => {
          setIsOpen((p) => !p);
        }}
        className="text-sm font-heading font-bold flex items-center justify-between w-full"
      >
        <span>Goal group {num}</span>
        <Icon type="ArrowDown" size={18} />
      </Listbox.Button>
      {isOpen && (
        <Listbox.Options static>
          {members.map((m) => (
            <Listbox.Option value={m} key={m}>
              SDG {m}: {m === 0 ? "Uncategorized" : unsdgs[m].title}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}
