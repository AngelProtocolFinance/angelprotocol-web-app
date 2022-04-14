import { useParams } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { CharityParam } from "../../types";

export default function Overview() {
  const { address: charity_addr } = useParams<CharityParam>();
  const { profileState } = useProfileState(charity_addr!);

  return (
    <div className="w-full  bg-white text-angey-grey p-3 rounded-md lg:text-white/90 lg:bg-transparent lg:rounded-none lg:p-0 text-md mb-4">
      <RichTextRenderer text={profileState.charity_overview} />
    </div>
  );
}
