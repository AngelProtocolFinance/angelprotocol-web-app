import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import ProfileContext from "contexts/ProfileContext";
import QueryLoader from "components/QueryLoader";
import { idParamToNum } from "helpers";
import Dashboard from "../Dashboard";
import createLinkGroups from "./createLinkGroups";

export default function AIF() {
  const { id } = useParams<{ id: string }>();
  const numId = idParamToNum(id);
  const queryState = useProfileQuery(numId, {
    skip: numId === 0,
  });

  const linkGroups = useMemo(() => createLinkGroups(id), [id]);

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
          <Dashboard linkGroups={linkGroups}>
            <div>AIF</div>
          </Dashboard>
        </ProfileContext.Provider>
      )}
    </QueryLoader>
  );
}
