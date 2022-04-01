import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { useParams } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import { CharityParam } from "../../types";

export default function Overview() {
  const { address: charity_addr } = useParams<CharityParam>();
  const { profileState } = useProfileState(charity_addr!);

  return (
    <div className="text-white/90 font-normal text-md inline-block mb-4">
      <RichTextRenderer text={profileState.charity_overview} />
    </div>
  );
}
