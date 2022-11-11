import { BtnLink } from "components/BtnLink";
import { appRoutes } from "constants/routes";
import { useProfileContext } from "../ProfileContext";

export default function DonateButton() {
  const profile = useProfileContext();

  return (
    <BtnLink
      as="link"
      to={appRoutes.donate + `/${profile.id}`}
      className="btn btn-orange w-full h-12 max-w-xs py-2 px-6 rounded text-sm normal-case"
    >
      Donate now
    </BtnLink>
  );
}
