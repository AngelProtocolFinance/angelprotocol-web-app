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
      className="px-3 pt-3"
      multiple
      value={types}
      onChange={(types: CapitalizedEndowmentType[]) => {
        dispatch(setTypes(types));
      }}
    >
      <Drawer isOpen={isOpen} toggle={toggle}>
        <span className="font-bold text-xs font-heading">Type</span>
      </Drawer>
      {isOpen && (
        <Listbox.Options static className="py-4 grid gap-4">
          {options.map(({ type, name }) => (
            <Listbox.Option
              value={type}
              key={type}
              className="gap-1 font-heading text-sm cursor-pointer"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} classes="mr-4 top-[3px]" />
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
