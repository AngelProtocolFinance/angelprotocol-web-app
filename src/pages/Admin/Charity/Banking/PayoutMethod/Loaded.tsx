import ExtLink from "components/ExtLink";
import { useModalContext } from "contexts/ModalContext";
import { CircleAlert, SquareArrowOutUpRight } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import type { PropsWithChildren } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useUpdateBankingApplicationMutation } from "services/aws/banking-applications";
import DeletePrompt from "./DeletePrompt";
import type { BankDetails } from "./index";

export default function Loaded() {
  const bank = useLoaderData() as BankDetails;
  const { id: endowID } = useAdminContext();
  const [update, { isLoading }] = useUpdateBankingApplicationMutation();

  const isRejected = bank.status === "rejected";
  const isApproved = bank.status === "approved";
  const prevVerdict = isRejected || isApproved;
  const isDefault = bank.thisPriorityNum === bank.topPriorityNum;

  const { showModal } = useModalContext();

  async function setDefault() {
    if (!isApproved) return alert("This payout method is not approved");
    if (isDefault) return alert("This payout method is already default");

    await update({ type: "prioritize", uuid: bank.id.toString() });
  }

  async function deleteMethod() {
    const APPROVED_PRIORITY_NUM = 2;
    const isWithHeir = (bank.heirPriorityNum || 0) >= APPROVED_PRIORITY_NUM;

    const [canProceed, message] =
      isDefault && isWithHeir
        ? [false, "Kindly set another payout method as default before deleting"]
        : isDefault
          ? [
              true,
              "Your Nonprofit must have at least one banking connection approved in order to receive payouts. Banking connections that are 'Under Review' do not count towards this and are not eligible to receive payouts until approved. Do you want to proceed with this deletion?",
            ]
          : [true, "Are you sure you want to delete this payment method?"];

    showModal(DeletePrompt, {
      canProceed,
      uuid: bank.id.toString(),
      message,
      endowID,
    });
  }

  return (
    <div className="grid">
      <div className="flex items-center gap-2">
        {prevVerdict && (
          <div
            className={`${
              isApproved ? "bg-green" : "bg-red"
            } text-white px-2 py-1 text-xs uppercase rounded inline-block`}
          >
            {isApproved ? "Approved" : "Rejected"}
          </div>
        )}
        {isDefault && (
          <div className="bg-blue text-white px-2 py-1 text-xs uppercase rounded inline-block">
            Default
          </div>
        )}
      </div>

      {isRejected && (
        <p className="text-sm text-red my-2">
          <CircleAlert className="relative inline bottom-px mr-1" />
          <span>{bank.rejectionReason}</span>
        </p>
      )}

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-gray-l4 rounded mt-2">
        <Row label="Currency">{bank.currency}</Row>
        <Row label="Country">{bank.country}</Row>
        <Row label="Recipient name">{bank.name.fullName}</Row>
        <Row label="Account type">{bank.type}</Row>
        <Row label="Legal entity type">{bank.legalEntityType}</Row>
        {bank.displayFields.map(({ label, value, key }) => (
          <Row key={key} label={label}>
            {value}
          </Row>
        ))}
        <Row label="Bank statement">
          <ExtLink
            href={bank.bankStatementFile.publicUrl}
            className="text-blue hover:text-blue-d1"
          >
            <span className="break-all">
              {bank.bankStatementFile.publicUrl}
            </span>
            <SquareArrowOutUpRight
              className="inline relative bottom-px ml-2"
              size={15}
            />
          </ExtLink>
        </Row>
      </dl>
      <div className="flex max-sm:flex-col gap-1 sm:gap-3 mt-4 sm:justify-self-end">
        <Link
          to={".."}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-outline"
        >
          back
        </Link>
        <button
          onClick={() => deleteMethod()}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-red"
        >
          delete
        </button>
        <button
          disabled={isLoading || isDefault || !isApproved}
          onClick={() => setDefault()}
          type="button"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-blue"
        >
          set default
        </button>
      </div>
    </div>
  );
}

type Props = PropsWithChildren<{
  label: string;
}>;
function Row(props: Props) {
  return (
    <>
      <dt className="px-3 max-sm:pt-3 sm:p-3 flex items-center text-xs font-semibold uppercase">
        {props.label}
      </dt>
      <div
        aria-hidden={true}
        className="max-sm:hidden w-px border-r border-gray-l4 last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-gray-l4 last:border-none"
      />
    </>
  );
}
