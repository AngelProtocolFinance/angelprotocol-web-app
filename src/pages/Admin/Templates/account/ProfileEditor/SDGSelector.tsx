import { Listbox } from "@headlessui/react";
// import { useState } from "react";
import { useController } from "react-hook-form";
import { UpdateProfileValues } from "pages/Admin/types";
import { unsdgs } from "constants/unsdgs";

const sdgs = Object.entries(unsdgs).map(([key, val]) => ({
  num: key,
  name: val.title,
}));

export default function SDGSelector() {
  const {
    field: { onChange, value },
  } = useController<Pick<UpdateProfileValues, "sdgNums">>({ name: "sdgNums" });

  return (
    <Listbox
      value={value}
      onChange={onChange}
      multiple
      as="div"
      className="w-full focus:outline-none rounded-md p-3 text-sm uppercase bg-light-grey shadow-inner-white-grey"
    >
      <Listbox.Button>{value.toLocaleString()}</Listbox.Button>
      <Listbox.Options>
        {sdgs.map((sdg) => (
          <Listbox.Option key={sdg.num} value={+sdg.num}>
            {sdg.num} - {sdg.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
