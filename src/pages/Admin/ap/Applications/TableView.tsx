import { SortDirection, SortKey } from "pages/Admin/types";
import { CharityApplication } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { statusColorClasses } from ".";
import Reviewer from "./Previewer";
import useSortedApplications from "./useSortApplications";

export default function TableView(props: {
  applications: CharityApplication[];
}) {
  const { showModal } = useModalContext();

  const openReviewer = (ap: CharityApplication) => {
    showModal(Reviewer, { application: ap });
  };

  const { sortedApplications, handleHeaderClick, sortDirection, sortKey } =
    useSortedApplications(props.applications);

  return (
    <table className="w-full text-white/80 overflow-hidden hidden sm:table">
      <TableSection type="thead" rowClass="flex flex-row block">
        <Cells
          type="th"
          cellClass="px-2 last:pr-0 flex flex-1 text-left uppercase bg-gray-200/20 py-2"
        >
          <>
            {headers.map((header) => (
              <HeaderButton
                key={header.key}
                onClick={handleHeaderClick(header.key)}
                activeSortKey={sortKey}
                sortKey={header.key}
                sortDirection={sortDirection}
              >
                {header.name}
              </HeaderButton>
            ))}
            <button className="w-full"></button>
          </>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="hover:bg-angel-blue hover:bg-angel-blue/10 mb-6 sm:mb-0 flex flex-row flex-no-wrap"
      >
        {sortedApplications.map((ap) => (
          <Cells
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0 group pl-4 pt-8 sm:pt-2 pb-2 text-left relative w-full border-grey-accent/30 border-t border-l border-b border-r sm:flex-1"
            key={ap.PK}
          >
            <p className="pl-1 capitalize w-42 sm:w-32">{ap.CharityName}</p>
            <p className="text-base font-bold w-42 sm:w-32 truncate">
              {ap.CharityName_ContactEmail}
            </p>
            <p className="text-base w-42 sm:w-32">
              {new Date(ap.RegistrationDate).toDateString()}
            </p>
            <p className="flex">
              <span
                className={`px-3 py-1.5 text-white-grey text-sm rounded-md ${
                  statusColorClasses[ap.RegistrationStatus]
                }`}
              >
                {ap.RegistrationStatus}
              </span>
            </p>
            <p className="font-mono flex justify-between items-center w-42 sm:w-32">
              <span className="text-base truncate w-22">
                {ap.JunoWallet || "-"}
              </span>
            </p>
            <div className="w-42 sm:w-32">
              <button
                onClick={() => openReviewer(ap)}
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

const headers: { key: SortKey; name: string }[] = [
  { key: "CharityName", name: "name" },
  { key: "CharityName_ContactEmail", name: "email" },
  { key: "RegistrationDate", name: "date" },
  { key: "RegistrationStatus", name: "status" },
  { key: "JunoWallet", name: "wallet address" },
];

function HeaderButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    sortDirection: SortDirection;
    sortKey: SortKey;
    activeSortKey: SortKey;
  }
) {
  const { activeSortKey, sortKey, sortDirection, children, ...restProps } =
    props;
  return (
    <button
      {...restProps}
      className="w-full flex items-center justify-start gap-1 uppercase font-heading font-semibold text-sm text-white/100"
    >
      <span>{children}</span>
      {activeSortKey === sortKey &&
        (sortDirection === "asc" ? <Icon type="Up" /> : <Icon type="Down" />)}
    </button>
  );
}
