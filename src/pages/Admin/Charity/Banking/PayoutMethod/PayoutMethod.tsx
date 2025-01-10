import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import type { BankDetails } from "api/get/payout-method";
import ExtLink from "components/ExtLink";
import { useActionResult } from "hooks/use-action-result";
import { CircleAlert, SquareArrowOutUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";

const APPROVED_PRIORITY_NUM = 2;

export {
  payoutMethodLoader as clientLoader,
  prioritizeAction as clientAction,
} from "./api";
export default function PayoutMethod() {
  const bank = useLoaderData() as BankDetails;
  const fetcher = useFetcher();
  useActionResult(fetcher.data);

  const isRejected = bank.status === "rejected";
  const isApproved = bank.status === "approved";
  const prevVerdict = isRejected || isApproved;
  const isDefault = bank.thisPriorityNum === bank.topPriorityNum;
  const isWithHeir = (bank.heirPriorityNum || 0) >= APPROVED_PRIORITY_NUM;

  return (
    <div className="grid">
      {/** render success and delete prompt */}
      <Outlet />
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
      <fetcher.Form
        method="POST"
        action="."
        className="flex max-sm:flex-col gap-1 sm:gap-3 mt-4 sm:justify-self-end"
      >
        <Link
          to={".."}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-outline"
        >
          back
        </Link>
        <Link
          replace
          preventScrollReset
          to={{
            pathname: "delete",
            search: new URLSearchParams({
              default: isDefault.toString(),
              with_heir: isWithHeir.toString(),
            }).toString(),
          }}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-red"
        >
          delete
        </Link>
        <button
          disabled={fetcher.state === "submitting" || isDefault || !isApproved}
          type="submit"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn-blue"
        >
          set default
        </button>
      </fetcher.Form>
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
