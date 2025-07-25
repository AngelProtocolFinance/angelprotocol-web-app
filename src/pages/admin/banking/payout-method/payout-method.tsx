import { priority_nums } from "@better-giving/banking-applications";
import { NavLink, Outlet, useFetcher } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import ExtLink from "components/ext-link";
import { useActionResult } from "hooks/use-action-result";
import { CircleAlert, SquareArrowOutUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { LoaderData } from "./api";

export { clientLoader } from "api/cache";
export {
  loader,
  prioritizeAction as action,
} from "./api";
export { ErrorBoundary } from "components/error";
export default function PayoutMethod() {
  const bank = useCachedLoaderData() as LoaderData;
  const fetcher = useFetcher();
  useActionResult(fetcher.data);

  const is_rejected = bank.status === "rejected";
  const is_approved = bank.status === "approved";
  const prevVerdict = is_rejected || is_approved;
  const is_default = bank.thisPriorityNum === bank.topPriorityNum;
  const is_with_heir = (bank.heirPriorityNum || 0) >= priority_nums.approved;

  return (
    <div className="grid">
      {/** render success and delete prompt */}
      <Outlet />
      <div className="flex items-center gap-2">
        {prevVerdict && (
          <div
            className={`${
              is_approved ? "bg-green" : "bg-red"
            } text-white px-2 py-1 text-xs uppercase rounded inline-block`}
          >
            {is_approved ? "Approved" : "Rejected"}
          </div>
        )}
        {is_default && (
          <div className="bg-blue text-white px-2 py-1 text-xs uppercase rounded-sm inline-block">
            Default
          </div>
        )}
      </div>

      {is_rejected && (
        <p className="text-sm text-red my-2">
          <CircleAlert className="relative inline bottom-px mr-1" />
          <span>{bank.rejectionReason}</span>
        </p>
      )}

      <dl className="grid sm:grid-cols-[auto_auto_1fr] border border-gray-l3 rounded-sm mt-2">
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
        className="flex max-sm:flex-col gap-1 sm:gap-3 mt-4 sm:justify-self-end"
      >
        <NavLink
          to={"../banking"}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-outline"
        >
          back
        </NavLink>
        <NavLink
          replace
          preventScrollReset
          to={{
            pathname: "delete",
            search: new URLSearchParams({
              default: is_default.toString(),
              with_heir: is_with_heir.toString(),
            }).toString(),
          }}
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-red"
        >
          delete
        </NavLink>
        <button
          disabled={
            fetcher.state === "submitting" || is_default || !is_approved
          }
          type="submit"
          className="px-4 py-1 min-w-[6rem] text-sm uppercase btn btn-blue"
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
        className="max-sm:hidden w-px border-r border-gray-l3 last:border-none"
      />
      <dd className="px-3 max-sm:pb-3 sm:p-3 flex items-center text-sm">
        {props.children}
      </dd>
      <div
        aria-hidden={true}
        className="h-px col-span-full border-b border-gray-l3 last:border-none"
      />
    </>
  );
}
