import { EndowmentApplication } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import AppRow from "./AppRow";
import Header from "./Header";
import StatusSelector from "./StatusSelector";
import useSortedApplications from "./useSortApplications";

export default function Table(props: { applications: EndowmentApplication[] }) {
  const { sortedApplications, handleHeaderClick, sortDirection, sortKey } =
    useSortedApplications(props.applications);

  return (
    <table className="w-full text-white/80 self-start">
      <TableSection type="thead" rowClass="border-b-2 border-zinc-50/30">
        <Cells type="th" cellClass="p-2">
          <Header
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"Name"}
            onClick={handleHeaderClick("Name")}
          >
            name
          </Header>
          <Header
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"Name_ContactEmail"}
            onClick={handleHeaderClick("Name_ContactEmail")}
          >
            email
          </Header>
          <Header
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"RegistrationDate"}
            onClick={handleHeaderClick("RegistrationDate")}
          >
            date
          </Header>
          <StatusSelector />
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="border-b border-zinc-50/10 hover:bg-zinc-50/5"
      >
        {sortedApplications.length <= 0 ? (
          <Cells type="td" cellClass="px-2 py-3">
            <>No applications found</>
          </Cells>
        ) : (
          sortedApplications.map((app) => <AppRow key={app.PK} {...app} />)
        )}
      </TableSection>
    </table>
  );
}
