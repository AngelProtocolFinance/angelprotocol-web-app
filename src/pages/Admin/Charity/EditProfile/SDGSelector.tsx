import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { useController } from "react-hook-form";
import { ProfileFormValues } from "pages/Admin/types";
import { unsdgs } from "constants/unsdgs";

const sdgs = Object.entries(unsdgs).map(([key, val]) => ({
  num: key,
  name: val.title,
}));

export default function SDGSelector() {
  const {
    field: { onChange, value },
  } = useController<Pick<ProfileFormValues, "sdgNum">>({ name: "sdgNum" });

  return (
    <Listbox
      value={value}
      onChange={onChange}
      as="div"
      className="w-full focus:outline-none rounded-md text-sm uppercase bg-gray-l2 shadow-inner-white relative"
    >
      <Listbox.Button className="w-full p-3 text-left uppercase">
        {value} - {unsdgs[value].title}
      </Listbox.Button>
      <Listbox.Options className="absolute bg-white shadow-2xl z-10 rounded-md table p-3 rounded-md">
        {sdgs.map((sdg) => (
          <Listbox.Option key={sdg.num} value={+sdg.num} as={Fragment}>
            {({ selected }) => (
              <div
                className={`text-gray-d4 table-row hover:bg-blue-l1/30 ${
                  selected ? "bg-amber-orange/30" : ""
                } cursor-pointer p-1`}
              >
                <span className="table-cell pr-2 p-1">{sdg.num}</span>
                <span className="table-cell p-1">{sdg.name}</span>
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
