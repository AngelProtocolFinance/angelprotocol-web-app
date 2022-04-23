import { PropsWithChildren } from "react";
import { useModalContext } from "components/ModalContext/ModalContext";
import TableSection, { Cells } from "components/TableSection/TableSection";
import Reviewer from "./Previewer";
import { CharityApplication } from "./types";

export default function ApplicationsTable(props: {
  applications: CharityApplication[];
  isError: boolean;
}) {
  const { showModal } = useModalContext();
  if (props.isError) {
    return <Tooltip>failed to get applications..</Tooltip>;
  }

  return (
    <table className="mt-4 w-full text-white/80 mt-4 overflow-hidden">
      <TableSection
        type="thead"
        rowClass="sm:visible invisible  sm:flex sm:inline-block mb-2"
      >
        <Cells type="th" cellClass="px-2 first:pl-0 last:pr-0 text-left flex-1">
          <>Name</>
          <>Contact Email</>
          <>Registration Date</>
          <>Wallet Address</>
          {/* <>Application Status</> */}
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10 mb-6 sm:mb-0 flex flex-row flex-wrap sm:flex-no-wrap"
      >
        {props.applications.map((ap) => (
          <Cells
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0 group pl-4 pt-8 sm:pt-2 pb-2 text-left relative w-full border-t border-l border-b border-r sm:flex-1"
            key={ap.PK}
          >
            <p className="pl-1 capitalize w-42 sm:w-32">
              {" "}
              <span className="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-200 pl-2">
                Name
              </span>
              {ap.CharityName}
            </p>
            <p className="text-base font-bold w-42 sm:w-32 truncate">
              <span className="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-200 pl-2">
                Contact Email
              </span>
              {ap.CharityName_ContactEmail}
            </p>
            <p className="text-base w-42 sm:w-32">
              <span className="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-200 pl-2">
                Registration Date
              </span>
              {new Date(ap.RegistrationDate).toDateString()}
            </p>
            <p className="font-mono flex justify-between items-center w-42 sm:w-32">
              <span className="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-200 pl-2">
                Wallet Address
              </span>
              <span className="text-base truncate w-22">{ap.TerraWallet}</span>
              {/* <Copier text={ap.TerraWallet} colorClass="orange" /> */}
            </p>
            {/* <Status label={ap.RegistrationStatus} /> */}
            <div className="w-42 sm:w-32">
              <span className="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-200 pl-2">
                Click to review
              </span>
              <button
                onClick={() => showModal(Reviewer, { application: ap })}
                className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
              >
                Review
              </button>
            </div>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

function Tooltip(props: PropsWithChildren<{}>) {
  return <p className="text-white font-mono text-sm">{props.children}</p>;
}

export function Status(props: { label: string }) {
  return (
    <span className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-orange group-hover:bg-opacity-50 font-heading text-sm uppercase text-center rounded-md">
      {props.label}
    </span>
  );
}
