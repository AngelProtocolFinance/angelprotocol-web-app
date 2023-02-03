import { useParams } from "react-router-dom";
import { LinkGroup } from "../types";
import { useProfileQuery } from "services/aws/aws";
import ProfileContext from "contexts/ProfileContext";
import QueryLoader from "components/QueryLoader";
import { idParamToNum } from "helpers";
import { appRoutes } from "constants/routes";
import Dashboard from "../Dashboard";
import { routes } from "./routes";

export default function AIF() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useProfileQuery(numId, {
    skip: numId === 0,
  });

  const rootPath = `${appRoutes.aif}/${id}`;

  const LINK_GROUPS: LinkGroup[] = [
    {
      links: [
        {
          title: "Dashboard",
          to: `${rootPath}${routes.index}`,
          icon: "Dashboard",
        },
        {
          title: "Withdraw",
          to: `${rootPath}${routes.withdraw}`,
          icon: "MoneyBill",
        },
        {
          title: "Contributions",
          to: `${rootPath}${routes.contributions}`,
          icon: "DollarCircle",
        },
      ],
    },
  ];

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Error fetching profile",
        loading: "Loading profile",
      }}
    >
      {(endowmentProfile) => (
        <ProfileContext.Provider value={endowmentProfile}>
          <Dashboard linkGroups={LINK_GROUPS}>
            <div>AIF</div>
          </Dashboard>
        </ProfileContext.Provider>
      )}
    </QueryLoader>
  );
}
