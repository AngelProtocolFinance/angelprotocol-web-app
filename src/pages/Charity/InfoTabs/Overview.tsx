import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { useRouteMatch } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import { CharityParam } from "../types";

export default function Overview() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const { profileState } = useProfileState(charity_addr);

  return (
    <div className="w-full max-h-3/4 md:max-h-auto bg-light-grey md:bg-transparent md:p-0 p-4 rounded-2xl lg:min-h-1/2 lg:py-10 lg:mt-2 2xl:mb-5 text-left overflow-y-scroll scroll-hidden">
      <span className="text-black md:text-white font-normal text-md inline-block mb-4">
        <RichTextRenderer text={profileState.charity_overview} />
      </span>
    </div>
  );
}
