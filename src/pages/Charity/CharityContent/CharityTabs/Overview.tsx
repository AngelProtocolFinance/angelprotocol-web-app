import { useParams } from "react-router-dom";
import { CharityParams } from "../../types";
import { useEndowmentProfileState } from "services/juno/account/states";
import RichTextRenderer from "components/RichTextRenderer";

export default function Overview() {
  const { address: charity_addr } = useParams<CharityParams>();
  const { profileState } = useEndowmentProfileState(charity_addr!);

  return (
    <div className="w-full  bg-white text-angey-grey p-3 rounded-md lg:text-white/90 lg:bg-transparent lg:rounded-none lg:p-0 text-md mb-4">
      <RichTextRenderer text={profileState?.overview || ""} />
    </div>
  );
}
