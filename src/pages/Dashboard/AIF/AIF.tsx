import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import ProfileContext from "contexts/ProfileContext";
import QueryLoader from "components/QueryLoader";
import { idParamToNum } from "helpers";
import Container from "../Container";
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
          <Container linkGroups={linkGroups}>
            <div className="min-h-[50vh]">AIF</div>
          </Container>
        </ProfileContext.Provider>
      )}
    </QueryLoader>
  );
}
