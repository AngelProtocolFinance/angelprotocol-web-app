import { DialogPanel, Radio, RadioGroup } from "@headlessui/react";
import { Copier } from "components/copier";
import { Check, X } from "lucide-react";
import { useState } from "react";

type AccountType = "savings" | "investments";

interface PanelProps {
  /** If not provided, user can select via radio buttons */
  account_type?: AccountType;
  /** NPO name used in reference memo */
  npo_name: string;
  /** NPO ID used in reference memo */
  npo_id: string;
  onClose: () => void;
}

interface AccountSelectorProps {
  value: AccountType;
  onChange: (v: AccountType) => void;
  classes?: string;
}

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  classes?: string;
}

interface MemoSectionProps {
  memo: string;
  account_type: AccountType;
  classes?: string;
}

interface InfoRowProps {
  label: string;
  value: string;
  copyable?: boolean;
}

interface InfoRowWithDetailsProps {
  label: string;
  value: string;
  details: string;
}

const BANK_DETAILS = {
  account_name: "Better Giving",
  account_number: "822000812545",
  routing_number: "026073150",
  swift_code: "CMFGUS33",
  account_type: "Checking",
  bank_name: "Community Federal Savings Bank",
  bank_address: "89-16 Jamaica Ave, Woodhaven, NY, 11421, United States",
} as const;

export function Panel({
  account_type: initial_account_type,
  npo_name,
  npo_id,
  onClose,
}: PanelProps) {
  const [account_type, set_account_type] = useState<AccountType>(
    initial_account_type ?? "savings"
  );
  const show_selector = !initial_account_type;

  const account_code = account_type === "savings" ? "S" : "I";
  const memo = `${npo_name}+${npo_id}+${account_code}`;

  return (
    <DialogPanel className="fixed-center z-10 bg-white w-[90vw] max-w-[680px] max-h-[90vh] overflow-y-auto rounded">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-l3 relative">
        <h2 className="text-2xl font-bold text-gray-d4 mb-2">Deposit Funds</h2>
        <p className="text-sm text-gray">
          Transfer funds to your Better Giving account
        </p>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 md:top-8 right-6 md:right-8 p-2 rounded border border-gray-l3 hover:bg-gray-l5 transition-colors"
        >
          <X size={24} className="text-gray" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Account Selector */}
        {show_selector && (
          <AccountSelector
            value={account_type}
            onChange={set_account_type}
            classes="mb-6"
          />
        )}

        {/* Section 1: Bank Account Details */}
        <InfoSection title="Bank Account Details" classes="mb-6">
          <InfoRow label="Account name" value={BANK_DETAILS.account_name} />
          <InfoRow label="Account number" value={BANK_DETAILS.account_number} />
          <InfoRow
            label="Account type"
            value={BANK_DETAILS.account_type}
            copyable={false}
          />
          <InfoRow label="Bank name" value={BANK_DETAILS.bank_name} />
          <InfoRow label="Bank address" value={BANK_DETAILS.bank_address} />
        </InfoSection>

        {/* Section 2: Routing Codes */}
        <InfoSection title="Routing Codes" classes="mb-6">
          <InfoRowWithDetails
            label="ACH Routing"
            value={BANK_DETAILS.routing_number}
            details="US domestic transfers · Free · 1-3 business days"
          />
          <InfoRowWithDetails
            label="SWIFT/BIC"
            value={BANK_DETAILS.swift_code}
            details="International transfers · $6.11 fee · 1-5 business days"
          />
        </InfoSection>

        {/* Section 3: Reference Memo */}
        <MemoSection memo={memo} account_type={account_type} classes="mb-6" />

        {/* Non-USD Note */}
        <p className="text-sm text-gray">
          For non-USD transfers, contact{" "}
          <a
            href="mailto:hi@better.giving"
            className="text-blue-d1 underline hover:no-underline"
          >
            hi@better.giving
          </a>{" "}
          for specific instructions.
        </p>
      </div>
    </DialogPanel>
  );
}

function AccountSelector({
  value,
  onChange,
  classes = "",
}: AccountSelectorProps) {
  return (
    <div className={classes}>
      <p className="text-sm font-semibold text-gray-d4 mb-2">Deposit to</p>
      <RadioGroup
        value={value}
        onChange={onChange}
        className="grid grid-cols-2 gap-3"
      >
        <Radio
          value={"savings" satisfies AccountType}
          className="group cursor-pointer border border-gray-l3 rounded p-4 aria-checked:border-blue aria-checked:bg-blue-l5 transition-colors flex items-center justify-between"
        >
          <span className="text-sm font-medium text-gray-d4 group-aria-checked:text-blue-d1">
            Savings account
          </span>
          <Check
            size={18}
            className="text-transparent group-aria-checked:text-blue"
          />
        </Radio>
        <Radio
          value={"investments" satisfies AccountType}
          className="group cursor-pointer border border-gray-l3 rounded p-4 aria-checked:border-blue aria-checked:bg-blue-l5 transition-colors flex items-center justify-between"
        >
          <span className="text-sm font-medium text-gray-d4 group-aria-checked:text-blue-d1">
            Investments account
          </span>
          <Check
            size={18}
            className="text-transparent group-aria-checked:text-blue"
          />
        </Radio>
      </RadioGroup>
    </div>
  );
}

function InfoSection({ title, children, classes = "" }: InfoSectionProps) {
  return (
    <div className={`bg-gray-l5 rounded p-5 ${classes}`}>
      <h3 className="text-base font-bold text-gray-d4 mb-4">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function MemoSection({ memo, account_type, classes = "" }: MemoSectionProps) {
  const account_label = account_type === "savings" ? "Savings" : "Investments";
  return (
    <div className={`bg-amber-l5 border border-amber rounded p-5 ${classes}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-amber-d2">
          Your Reference Memo
        </h3>
        <span className="text-xs font-medium text-amber-d1 bg-amber-l4 px-2 py-1 rounded">
          {account_label}
        </span>
      </div>
      <p className="text-sm text-amber-d1 mb-4">
        You must include this code when making your transfer, or we won't be
        able to identify your deposit.
      </p>
      <div className="bg-white rounded p-4 border border-amber-l3">
        <div className="flex items-center justify-between gap-4">
          <code className="text-lg font-bold text-gray-d4 font-mono tracking-wide break-all">
            {memo}
          </code>
          <Copier
            text={memo}
            classes={{
              container:
                "shrink-0 px-4 py-2 text-sm font-semibold text-white bg-amber hover:bg-amber-d1 rounded transition-colors flex items-center gap-2",
            }}
          >
            Copy
          </Copier>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, copyable = true }: InfoRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
      <span className="text-sm text-gray min-w-[140px]">{label}</span>
      <div className="flex-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-d4 text-pretty flex-1">
          {value}
        </span>
        {copyable && (
          <Copier
            text={value}
            classes={{
              container:
                "shrink-0 px-2.5 py-1.5 text-xs text-gray bg-white border border-gray-l3 rounded hover:bg-gray-l5 transition-colors",
            }}
          />
        )}
      </div>
    </div>
  );
}

function InfoRowWithDetails({
  label,
  value,
  details,
}: InfoRowWithDetailsProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-start">
      <span className="text-sm text-gray">{label}</span>
      <div className="flex items-center gap-2 row-span-2">
        <span className="text-sm font-semibold text-gray-d4">{value}</span>
        <Copier
          text={value}
          classes={{
            container:
              "shrink-0 px-2.5 py-1.5 text-xs text-gray bg-white border border-gray-l3 rounded hover:bg-gray-l5 transition-colors",
          }}
        />
      </div>
      <p className="text-xs text-gray-l1 text-pretty">{details}</p>
    </div>
  );
}
