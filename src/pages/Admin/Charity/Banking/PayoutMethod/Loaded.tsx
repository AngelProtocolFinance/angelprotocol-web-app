import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { BankingApplicationDetails } from "services/types";
import { useAdminContext } from "pages/Admin/Context";
import { useUpdateBankingApplicationMutation } from "services/aws/banking-applications";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { adminRoutes } from "constants/routes";
import DeletePrompt from "./DeletePrompt";

export default function Loaded(props: BankingApplicationDetails) {
  const { id: endowID } = useAdminContext();
  const [update, { isLoading }] = useUpdateBankingApplicationMutation();

  const isRejected = props.status === "rejected";
  const isApproved = props.status === "approved";
  const prevVerdict = isRejected || isApproved;
  const isDefault = props.thisPriorityNum === props.topPriorityNum;

  const { showModal } = useModalContext();

  async function setDefault() {
    if (!isApproved) return alert("This payout method is not approved");
    if (isDefault) return alert("This payout method is already default");

    await update({ type: "prioritize", uuid: props.id.toString() });
  }

  async function deleteMethod() {
    const APPROVED_PRIORITY_NUM = 2;
    const isWithHeir = (props.heirPriorityNum || 0) >= APPROVED_PRIORITY_NUM;

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
      uuid: props.id.toString(),
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
            } text-white px-2 py-1 text-xs font-work uppercase rounded inline-block`}
          >
            {isApproved ? "Approved" : "Rejected"}
          </div>
        )}
        {isDefault && (
          <div className="bg-blue text-white px-2 py-1 text-xs font-work uppercase rounded inline-block">
            Default
          </div>
        )}
      </div>

      {isRejected && (
        <p className="text-sm text-red my-2">
          <Icon type="Info" className="relative inline bottom-px mr-1" />
          <span>{props.rejectionReason}</span>
        </p>
      )}

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-prim rounded mt-2">
        <Row label="Currency">{props.currency}</Row>
        <Row label="Country">{props.country}</Row>
        <Row label="Recipient name">{props.name.fullName}</Row>
        <Row label="Account type">{props.type}</Row>
        <Row label="Legal entity type">{props.legalEntityType}</Row>
        {props.displayFields.map(({ label, value, key }) => (
          <Row key={key} label={label}>
            {value}
          </Row>
        ))}
        <Row label="Bank statement">
          <ExtLink
            href={props.bankStatementFile.publicUrl}
            className="text-blue hover:text-blue-d1"
          >
            <span className="break-all">
              {props.bankStatementFile.publicUrl}
            </span>
            <Icon
              type="ExternalLink"
              className="inline relative bottom-px ml-2"
              size={15}
            />
          </ExtLink>
        </Row>
      </dl>
      <div className="flex max-sm:flex-col gap-1 sm:gap-3 mt-4 sm:justify-self-end">
        <Link
          to={`../${adminRoutes.banking}`}
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-outline"
        >
          back
        </Link>
        <button
          onClick={() => deleteMethod()}
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-red"
        >
          delete
        </button>
        <button
          disabled={isLoading || isDefault || !isApproved}
          onClick={() => setDefault()}
          type="button"
          className="px-4 py-1 min-w-[6rem] font-work text-sm uppercase btn-orange"
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
        className="max-sm:hidden w-px border-r border-prim last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-prim last:border-none"
      />
    </>
  );
}
