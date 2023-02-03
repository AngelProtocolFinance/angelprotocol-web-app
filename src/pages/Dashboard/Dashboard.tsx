import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "services/aws/aws";
import ProfileContext from "contexts/ProfileContext";
import QueryLoader from "components/QueryLoader";
import { idParamToNum } from "helpers";
import Sidebar from "./Sidebar";

type Props = PropsWithChildren<{}>;

export default function Dashboard(props: Props) {
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
      {(endowmentProfile) => (
        <ProfileContext.Provider value={endowmentProfile}>
          <div className="grid grid-cols-[auto_1fr] w-full h-full">
            <Sidebar />
            <div className="p-10 h-full">{props.children}</div>
          </div>
        </ProfileContext.Provider>
      )}
    </QueryLoader>
  );
}
