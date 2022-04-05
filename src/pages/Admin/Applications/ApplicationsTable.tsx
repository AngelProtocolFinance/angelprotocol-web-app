import { PropsWithChildren } from "react";
import TableSection, { Cells } from "components/TableSection/TableSection";
// import maskAddress from "helpers/maskAddress";
import { CharityApplication } from "./types";
import Copier from "components/Copier/Copier";
import { useSetModal } from "components/Modal/Modal";
import Reviewer from "./Previewer";

export default function ApplicationsTable(props: {
  applications: CharityApplication[];
  isError: boolean;
}) {
  const { showModal } = useSetModal();
  if (props.isError) {
    return <Tooltip>failed to get applications..</Tooltip>;
  }

  return (
    <table className="mt-4 w-full text-white/80 mt-4">
      <TableSection type="thead" rowClass="">
        <Cells type="th" cellClass="px-2 first:pl-0 last:pr-0 text-left">
          <>Name</>
          <>Contact Email</>
          <>Registration Date</>
          <>Wallet Address</>
          <>Application Status</>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10 overflow-hidden"
      >
        {props.applications.map((ap) => (
          <Cells
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0 group"
            key={ap.PK}
          >
            <p className="capitalize">{ap.CharityName}</p>
            <p className="text-base font-bold w-32 truncate">
              {ap.CharityName_ContactEmail}
            </p>
            <p className="text-base">
              {new Date(ap.RegistrationDate).toDateString()}
            </p>
            <p className="font-mono flex justify-between items-center">
              <span className="text-base truncate w-22">{ap.TerraWallet}</span>
              <Copier text={ap.TerraWallet} colorClass="orange" />
            </p>
            <Status label={ap.RegistrationStatus} />
            <button
              onClick={() => showModal(Reviewer, { application: ap })}
              className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
            >
              Review
            </button>
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
