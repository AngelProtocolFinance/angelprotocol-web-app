import { RadioGroup } from "@headlessui/react";
import { ProposalStatusOptions } from "slices/admin/types";
import { useGetter, useSetter } from "store/accessors";
import { changeSelectedStatus } from "slices/admin/proposals";

export default function StatusSelector() {
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  return (
    <RadioGroup
      value={activeStatus}
      onChange={(s) => dispatch(changeSelectedStatus(s))}
      className="flex"
    >
      <RadioGroup.Label>Status:</RadioGroup.Label>
      {Object.entries(pollStatusOptions).map(
        ([optionValue, optionDescription]) => (
          <RadioGroup.Option
            key={optionValue}
            value={optionValue}
            className="px-4 py-[0.0625rem] border border-prim rounded capitalize"
          >
            {optionDescription}
          </RadioGroup.Option>
        )
      )}
    </RadioGroup>
  );
}

const pollStatusOptions: { [key in ProposalStatusOptions]: string } = {
  approved: "approved",
  open: "open",
};
