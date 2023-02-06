import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { EndowmentProfile } from "types/aws";
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

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        error: "Error fetching profile",
        loading: "Loading profile",
      }}
    >
      {(endowmentProfile) => <InnerComponent profile={endowmentProfile} />}
    </QueryLoader>
  );
}

function InnerComponent({ profile }: { profile: EndowmentProfile }) {
  const linkGroups = useMemo(() => createLinkGroups(profile.id), [profile.id]);

  return (
    <ProfileContext.Provider value={profile}>
      <Container linkGroups={linkGroups}>
        <div className="min-h-[50vh]">AIF</div>
      </Container>
    </ProfileContext.Provider>
  );
}
