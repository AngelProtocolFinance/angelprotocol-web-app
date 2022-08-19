import { SortDirection, SortKey } from "pages/Admin/types";
import { CharityApplication } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { statusColors } from ".";
import Application from "./Application";
import StatusSelector from "./StatusSelector";
import useSortedApplications from "./useSortApplications";

export default function Table(props: { applications: CharityApplication[] }) {
  const { showModal } = useModalContext();

  const { sortedApplications, handleHeaderClick, sortDirection, sortKey } =
    useSortedApplications(props.applications);

  return (
    <table className="w-full text-white/80 overflow-hidden hidden sm:table">
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/30">
        <Cells type="th" cellClass="p-2">
          <HeaderButton
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"CharityName"}
            onClick={handleHeaderClick("CharityName")}
          >
            name
          </HeaderButton>
          <HeaderButton
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"CharityName_ContactEmail"}
            onClick={handleHeaderClick("CharityName_ContactEmail")}
          >
            email
          </HeaderButton>
          <HeaderButton
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"RegistrationDate"}
            onClick={handleHeaderClick("RegistrationDate")}
          >
            date
          </HeaderButton>
          <StatusSelector />
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-zinc-50/10 hover:bg-zinc-50/5"
      >
        {sortedApplications.map((ap) => (
          <Cells type="td" cellClass="px-2 py-3" key={ap.PK}>
            <>{ap.CharityName}</>
            <>{ap.CharityName_ContactEmail?.split("_")[1]}</>
            <>{new Date(ap.RegistrationDate).toDateString()}</>
            <span
              className={`${
                statusColors[ap.RegistrationStatus].text
              } uppercase text-sm`}
            >
              {ap.RegistrationStatus}
            </span>
            <button
              onClick={() => showModal(Application, ap)}
              className="uppercase font-heading font-bold text-sm hover:text-angel-blue active:text-angel-orange"
            >
              Review
            </button>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

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
      {activeSortKey === sortKey && (
        <Icon type={sortDirection === "asc" ? "Up" : "Down"} />
      )}
    </button>
  );
}
