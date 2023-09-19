import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { ApplicationStatusOptions } from "slices/admin/types";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { changeSelectedStatus } from "slices/admin/applications";

const options: ApplicationStatusOptions[] = [
  "active",
  "approved",
  "under-review",
  "pending",
  "inactive",
];
const texts: { [key in ApplicationStatusOptions]: string } = {
  active: "active",
  approved: "approved",
  "under-review": "under review",
  pending: "pending",
  inactive: "inactive",
};

export default function StatusSelector() {
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.applications);

  function handleStatusChange(value: ApplicationStatusOptions) {
    dispatch(changeSelectedStatus(value));
  }
  return (
    <Listbox value={activeStatus} onChange={handleStatusChange}>
      <div className="relative">
        <Listbox.Button
          className={`flex items-center gap-1 text-sm uppercase cursor-pointer font-heading`}
        >
          <span>status</span>
          <Icon type="FilterLeft" size={20} />
        </Listbox.Button>
        <Listbox.Options className="absolute w-max rounded bg-white dark:bg-blue-d7 border border-prim">
          {options.map((status) => (
            <Listbox.Option key={status} value={status} as={Fragment}>
              {({ selected }) => (
                <li
                  className={`font-normal p-2 text-sm uppercase hover:bg-blue-l2/30 flex items-center justify-between cursor-pointer`}
                >
                  <span>{texts[status]}</span>
                  {selected && <Icon type="Check" className="text-green" />}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
