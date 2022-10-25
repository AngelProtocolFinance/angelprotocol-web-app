import Icon from "components/Icon";
import { useProfileContext } from "../ProfileContext";

export default function NameAddressSection(props: { className: string }) {
  const profile = useProfileContext();

  return (
    <div
      className={`flex flex-col gap-8 items-center w-full max-w-sm text-black dark:text-white xl:gap-6 xl:items-start xl:h-full ${props.className}`}
    >
      <p className="font-header font-bold text-2xl max-w-[320px] truncate sm:text-3xl sm:max-w-full">
        {profile.name}
      </p>
      <span className="flex items-center justify-center gap-2 text-sm sm:text-base font-work uppercase">
        <Icon type="MapPin" className="h-5 w-5 sm:h-6 sm:w-6" />
        {profile.street_address}
      </span>
    </div>
  );
}
