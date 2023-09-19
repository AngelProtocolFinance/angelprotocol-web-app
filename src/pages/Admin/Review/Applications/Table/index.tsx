import { useEndowmentApplicationsQuery } from "services/aws/registration";
import { Info, LoadingStatus } from "components/Status";
import TableSection, { Cells } from "components/TableSection";
import { useGetter } from "store/accessors";
import AppRow from "./AppRow";
import Header from "./Header";
import StatusSelector from "./StatusSelector";
import useSortedApplications from "./useSortApplications";

export default function Table() {
  const { activeStatus } = useGetter((state) => state.admin.applications);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useEndowmentApplicationsQuery(activeStatus);

  const { sortedApplications, handleHeaderClick, sortDirection, sortKey } =
    useSortedApplications(data);

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
        </Cells>
      </TableSection>

      {isLoading || isFetching ? (
        <TableSection type="tbody" rowClass="border-b border-prim">
          <td colSpan={4} className="h-24">
            <LoadingStatus>Loading...</LoadingStatus>
          </td>
        </TableSection>
      ) : sortedApplications.length < 1 ? (
        <TableSection type="tbody" rowClass="border-b border-prim">
          <td colSpan={4} className="h-24">
            <Info>No applications found</Info>
          </td>
        </TableSection>
      ) : (
        <TableSection type="tbody" rowClass="border-b border-prim">
          {sortedApplications.map((app) => (
            <AppRow key={app.PK} {...app} />
          ))}
        </TableSection>
      )}
    </table>
  );
}
