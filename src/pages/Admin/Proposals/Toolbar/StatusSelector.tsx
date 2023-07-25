import { RadioGroup } from "@headlessui/react";
import { ProposalStatusOptions } from "slices/admin/types";
import { useGetter, useSetter } from "store/accessors";
import { changeSelectedStatus } from "slices/admin/proposals";

export default function StatusSelector({ classes = "" }) {
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  return (
    <RadioGroup
      value={activeStatus}
      onChange={(s) => dispatch(changeSelectedStatus(s))}
      className={`${classes} flex gap-2 items-center`}
    >
      <RadioGroup.Label className="text-sm mr-3">Status:</RadioGroup.Label>
      {Object.entries(pollStatusOptions).map(
        ([optionValue, optionDescription]) => (
          <RadioGroup.Option
            key={optionValue}
            value={optionValue}
            className="px-4 py-2 border border-prim rounded capitalize font-bold text-sm aria-checked:bg-orange/25 aria-checked:border-orange"
          >
            {optionDescription}
          </RadioGroup.Option>
        )
      )}
    </RadioGroup>
  );
}

const pollStatusOptions: { [key in ProposalStatusOptions]: string } = {
  open: "open",
  approved: "approved",
  expired: "expired",
  all: "all",
};
