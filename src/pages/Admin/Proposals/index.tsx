import { useState } from "react";
import { Transaction } from "types/contracts/multisig";
import { useProposalsQuery } from "services/juno/custom";
import Icon, { DrawerIcon } from "components/Icon";
import Seo from "components/Seo";
import TableSection, { Cells } from "components/TableSection";
import { Status } from "components/admin";
import { useGetter } from "store/accessors";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";
import ProposalDetails from "../ProposalDetails";
import Toolbar from "./Toolbar";

export default function Proposals() {
  const { multisig } = useAdminResources();
  const [pageNum, setPageNum] = useState(1);
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  const {
    data: { proposals, next } = { proposals: [], next: undefined },
    isLoading,
  } = useProposalsQuery({
    multisig,
    page: pageNum,
    status: activeStatus,
  });

  function loadMoreProposals() {
    //loadMore button will be hidden if next page is undefined
    setPageNum((prev) => prev + 1);
  }

  return (
    <div className="grid content-start rounded font-work">
      <Seo
        title={`Decision Center - ${APP_NAME}`}
        url={`${DAPP_DOMAIN}/${adminRoutes.proposals}`}
      />
      <Toolbar classes="mb-6" />

      {(proposals.length > 0 && (
        <table className="table-fixed">
          <TableSection
            rowClass="bg-orange-l6 dark:bg-blue-d6 hover:bg-orange-l5 hover:dark:bg-blue-d7"
            type="thead"
          >
            <Cells
              type="th"
              cellClass="p-4 text-xs text-left border border-prim uppercase font-heading"
            >
              <span />
              <>status</>
              <>request</>
              <>ends</>
              <>votes</>
              <>actions</>
            </Cells>
          </TableSection>
          <tbody>
            {proposals.map((proposal) => (
              <Row proposal={proposal} />
            ))}
          </tbody>
          {next && (
            <tr>
              <td
                colSpan={6}
                className="p-4 text-xs text-center border border-prim font-heading"
              >
                <button
                  disabled={isLoading}
                  className="text-center text-xs disabled:bg-gray uppecase font-heading uppercase rounded-sm font-bold"
                  onClick={loadMoreProposals}
                >
                  {isLoading ? (
                    <Icon type="Loading" className="animate-spin" size={18} />
                  ) : (
                    "Load More Decisions"
                  )}
                </button>
              </td>
            </tr>
          )}
        </table>
      )) || (
        <p className="place-self-start">
          {isLoading ? "loading proposals.." : "no proposals found"}
        </p>
      )}
    </div>
  );
}

function Row({ proposal }: { proposal: Transaction }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="border border-prim divide-x divide-prim odd:bg-orange-l6 odd:dark:bg-blue-d7">
        <Cells
          key={proposal.id}
          type="td"
          cellClass="first:w-12 [&:nth-child(2)]:w-28 last:w-24 [&:nth-child(5)]:w-24 [&:nth-child(4)]:w-24 p-4 text-xs text-left border border-prim font-heading"
        >
          <DrawerIcon
            isOpen={open}
            onClick={() => setOpen(!open)}
            size={25}
            className="mx-0 dark:text-gray shrink-0"
          />
          <Status status={proposal.status} />
          <>
            ID: {proposal.id} {proposal.title}
          </>
          <>need data</>
          <>need data</>
          <span className="flex justify-between">
            <Icon type="CheckCircle" className="text-2xl text-green" />
            <Icon type="CloseCircle" className="text-2xl text-red" />
          </span>
        </Cells>
      </tr>
      {open ? <ProposalDetails id={proposal.id} /> : null}
    </>
  );
}
