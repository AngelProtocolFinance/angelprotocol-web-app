import Image from "components/Image";
import { useEndowment } from "services/aws/useEndowment";
import { useAdminContext } from "../../Context";

export default function Header() {
  const { id } = useAdminContext();
  const { data: profile, isLoading } = useEndowment(id, ["logo", "name"]);

  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-gray-l4`}
    >
      <div className="flex justify-between">
        <Image
          className="w-14 h-14"
          src={profile?.logo}
          isSrcLoading={isLoading}
        />
      </div>
      <h5 className="text-sm font-bold truncate mt-2">
        {profile?.name || "Nonprofit"}
      </h5>
    </div>
  );
}
