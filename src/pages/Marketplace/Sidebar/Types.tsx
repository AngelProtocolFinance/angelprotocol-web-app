import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { CapitalizedEndowmentType } from "types/contracts";
import { useGetter, useSetter } from "store/accessors";
import { setTypes } from "slices/components/marketFilter";
import { Checkbox, Drawer } from "./common";

type Option = { type: CapitalizedEndowmentType; name: string };

const options: Option[] = [
  { name: "Registered Non-Profit", type: "Charity" },
  { name: "Impact For-Profit", type: "Normal" },
  // { name: "Impact Crowdfunding", type: "ic" },
];

export default function Types() {
  const [isOpen, setIsOpen] = useState(true);
  const { types } = useGetter((state) => state.component.marketFilter);
  const dispatch = useSetter();

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Listbox
      as="div"
      className="grid gap-4 px-2 py-3 border-b border-gray-l2"
      multiple
      value={types}
      onChange={(types: CapitalizedEndowmentType[]) =>
        dispatch(setTypes(types))
      }
    >
      <Drawer isOpen={isOpen} toggle={toggle}>
        <span className="font-bold text-xs font-heading uppercase">Type</span>
      </Drawer>
      {isOpen && (
        <Listbox.Options static className="grid">
          {options.map(({ type, name }) => (
            <Listbox.Option
              value={type}
              key={type}
              className="flex items-center gap-4 h-12 p-1 text-sm font-normal font-body cursor-pointer"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} readOnly />
                  {name}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}
