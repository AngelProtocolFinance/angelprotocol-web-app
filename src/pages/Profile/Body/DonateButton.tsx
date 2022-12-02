import { BtnLink } from "components/BtnLink";
import { appRoutes } from "constants/routes";
import { useProfileContext } from "../ProfileContext";

export default function DonateButton({
  className = "",
}: {
  className?: string;
}) {
  const profile = useProfileContext();

  return (
    <BtnLink
      as="link"
      to={appRoutes.donate + `/${profile.id}`}
      className={`${className} btn btn-orange h-12 px-6 rounded text-base lg:text-sm`}
    >
      Donate now
    </BtnLink>
  );
}
