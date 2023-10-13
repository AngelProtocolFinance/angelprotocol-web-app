import { useProfileQuery } from "services/aws/aws";
import Image from "components/Image";
import { useAdminContext } from "../../Context";
import MyEndowments from "./MyEndowments";

export default function CharityHeader() {
  const { id } = useAdminContext();
  const { data: profile, isLoading } = useProfileQuery({ endowId: id });

  return (
    <>
      <div className="flex justify-between">
        <Image
          className="w-14 h-14"
          src={profile?.logo}
          isSrcLoading={isLoading}
        />
      </div>
      <h5 className="text-sm font-bold truncate mt-2">
        {profile?.name || "Endowment"}
      </h5>
      <MyEndowments showEndowments={true} endowments={[]} />
    </>
  );
}
