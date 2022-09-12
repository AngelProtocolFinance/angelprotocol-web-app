import { RadioGroup } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment } from "react";
import { useController } from "react-hook-form";
import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { Label, TextInput } from "components/admin";

const types: V["beneficiaryType"][] = ["wallet", "index fund", "endowment"];

export default function Beneficiary() {
  const {
    formState: { errors },
    field: { value: type, onChange: onTypeChange },
  } = useController<Pick<V, "beneficiaryType">>({ name: "beneficiaryType" });

  return (
    <div className="mt-6">
      <Label _required className="mb-2 text-angel-grey">
        Beneficiary
      </Label>
      <ErrorMessage
        as="p"
        errors={errors}
        name="beneficiaryType"
        className="font-mono font-semibold text-left text-red-400 text-xs mb-2"
      />
      <RadioGroup
        value={type}
        onChange={onTypeChange}
        name="plan"
        className="flex gap-2 mb-6"
      >
        {types.map((type) => (
          <RadioGroup.Option key={type} value={type} as={Fragment}>
            {({ checked }) => (
              <span
                className={`${
                  checked ? "bg-angel-blue/20" : ""
                } text-angel-grey w-36 cursor-pointer rounded-sm border border-angel-grey/40 px-3 py-1 text-center text-sm uppercase`}
              >
                {type}
              </span>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      {type === "wallet" && (
        <TextInput<V>
          title="Wallet address"
          name="wallet"
          placeholder="juno123abc..."
          required
          mono
        />
      )}
      {type === "endowment" && (
        <TextInput<V>
          title="Endowment id"
          name="endowmentId"
          placeholder="1"
          required
          mono
        />
      )}
      {type === "index fund" && (
        <TextInput<V>
          title="Fund id"
          name="indexFund"
          placeholder="1"
          required
          mono
        />
      )}
    </div>
  );
}
