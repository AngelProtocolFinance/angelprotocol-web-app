import { useState } from "react";
import { useProposalsQuery } from "services/juno/custom";
import { useProposalsQuery as useSubgraphProposalsQuery } from "services/subgraph";
import Seo from "components/Seo";
import { useGetter } from "store/accessors";
import { APP_NAME, DAPP_URL } from "constants/env";
import { adminRoutes } from "constants/routes";
import { useAdminContext } from "../Context";
import Table from "./Table";
import Toolbar from "./Toolbar";

export default function Proposals() {
  const { multisig } = useAdminContext();
  const [pageNum, setPageNum] = useState(1);
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  const query = useSubgraphProposalsQuery({
    multisig,
    page: 1,
    status: "approved",
  });

  console.log({ query });

  const {
    data: { proposals, next } = { proposals: [], next: undefined },
    isLoading,
    isFetching,
  } = useProposalsQuery({
    multisig,
    page: pageNum,
    status: activeStatus,
  });

  function more() {
    //loadMore button will be hidden if next page is undefined
    setPageNum((prev) => prev + 1);
  }

  return (
    <div className="grid content-start rounded">
      <Seo
        title={`Decision Center - ${APP_NAME}`}
        url={`${DAPP_URL}/${adminRoutes.proposals}`}
      />

      <Toolbar classes="@xl:mb-6" />

      {(proposals.length > 0 && (
        <Table
          proposals={proposals}
          more={isFetching ? "loading" : next ? more : undefined}
        />
      )) || (
        <p className="place-self-start">
          {isLoading ? "loading decisions.." : "no decisions found"}
        </p>
      )}
    </div>
  );
}
