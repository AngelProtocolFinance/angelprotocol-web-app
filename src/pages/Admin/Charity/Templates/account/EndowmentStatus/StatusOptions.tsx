import { RadioGroup } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";
import { useController } from "react-hook-form";
// import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormValues as FV } from "./types";
import Beneficiary from "./Beneficiary";

const statuses: FV["status"][] = ["approved", "closed", "frozen", "inactive"];

export default function StatusOptions() {
  const {
    formState: { errors },
    field: { value: status, onChange: onStatusChange },
  } = useController<Pick<FV, "status">>({ name: "status" });

  return (
    <>
      <RadioGroup
        value={status}
        onChange={onStatusChange}
        name="plan"
        className="flex gap-2"
      >
        {statuses.map((s) => (
          <RadioGroup.Option key={s} value={s} as={Fragment}>
            {({ checked }) => (
              <span
                className={`${
                  checked ? "bg-blue/20" : ""
                } text-gray-d2 w-36 cursor-pointer rounded-sm border border-gray-d2/40 px-3 py-1 text-center text-sm uppercase`}
              >
                {s}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <ErrorMessage
        as="p"
        errors={errors}
        name="status"
        className="font-mono font-semibold text-right text-red-l1 text-xs m-1"
      />
      {status === "closed" && <Beneficiary />}
    </>
  );
}
