import { useParams } from "react-router-dom";
import { useProfileQueryState } from "services/aws/endowments";
import RichTextRenderer from "components/RichTextRenderer";
import { CharityParams } from "../../types";

export default function Overview() {
  const { address: charity_addr } = useParams<CharityParams>();
  const { data } = useProfileQueryState(charity_addr!);

  return (
    <div className="w-full  bg-white text-angey-grey p-3 rounded-md lg:text-white/90 lg:bg-transparent lg:rounded-none lg:p-0 text-md mb-4">
      <RichTextRenderer text={data?.charity_overview || ""} />
    </div>
  );
}
