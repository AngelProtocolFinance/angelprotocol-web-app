import { EndowmentProposal } from "types/aws";
import TableSection, { Cells } from "components/TableSection";
import AppRow from "./AppRow";
import Header from "./Header";
import StatusSelector from "./StatusSelector";
import useSortedApplications from "./useSortApplications";

export default function Table(props: { applications: EndowmentProposal[] }) {
  const { sortedApplications, handleHeaderClick, sortDirection, sortKey } =
    useSortedApplications(props.applications);

  return (
    <table className="w-full self-start font-work">
      <TableSection type="thead" rowClass="border-b-2 border-prim">
        <Cells type="th" cellClass="p-2">
          <Header
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"OrganizationName"}
            onClick={handleHeaderClick("OrganizationName")}
          >
            name
          </Header>
          <Header
            sortDirection={sortDirection}
            activeSortKey={sortKey}
            sortKey={"Email"}
            onClick={handleHeaderClick("Email")}
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
      <TableSection type="tbody" rowClass="border-b border-prim">
        {sortedApplications.map((app) => (
          <AppRow key={app.PK} {...app} />
        ))}
      </TableSection>
    </table>
  );
}
