import { useGetter, useSetter } from "@/store/accessors";
import Icon from "@ap/components/icon";
import { ApplicationStatusOptions, applications } from "@ap/slices/admin";
import { Listbox } from "@headlessui/react";
import { Fragment } from "react";

const options: ApplicationStatusOptions[] = [
  "all",
  "approved",
  "not-complete",
  "under-review",
];
const texts: { [key in ApplicationStatusOptions]: string } = {
  all: "all",
  approved: "approved",
  "not-complete": "not complete",
  "under-review": "under review",
};

export default function StatusSelector() {
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.applications);

  function handleStatusChange(value: ApplicationStatusOptions) {
    dispatch(applications.changeSelectedStatus(value));
  }
  return (
    <Listbox value={activeStatus} onChange={handleStatusChange}>
      <div className="relative">
        <Listbox.Button
          className={`flex items-center gap-1 text-sm uppercase cursor-pointer font-heading`}
        >
          <span>{activeStatus === "all" ? "status" : texts[activeStatus]}</span>
          <Icon type="FilterLeft" size={20} />
        </Listbox.Button>
        <Listbox.Options className="absolute w-max rounded bg-white dark:bg-blue-d7 p-3 border border-prim">
          {options.map((status) => (
            <Listbox.Option key={status} value={status} as={Fragment}>
              {({ selected }) =>
                (!selected && (
                  <li
                    className={`font-normal px-2 py-0.5 text-sm uppercase hover:bg-blue-l2/30 text-left cursor-pointer`}
                  >
                    {texts[status]}
                  </li>
                )) || <></>
              }
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
