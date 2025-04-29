import Copier from "components/copier";
import { BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";

interface Props {
  classes?: string;
  referral_id: string;
}

export function ReferralId({ classes = "", ...p }: Props) {
  return (
    <div
      className={`bg-gray-l5 p-6 rounded-xl border border-gray-l4 ${classes}`}
    >
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-l1 mb-1">REFERRAL ID</div>
        <div className="flex items-center">
          <div className="text-xl font-semibold mr-2">{p.referral_id}</div>
          <Copier
            text="XYZ-1234"
            classes={{
              container: "text-gray hover:text-gray-d1",
              icon: "size-5",
            }}
            size={20}
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-l1 mb-1">
          REFERRAL LINK
        </div>
        <div className="flex items-center">
          <p className="text-blue-l1 truncate max-w-xs font-mono">
            {BASE_URL}
            {appRoutes.register}/{regRoutes.welcome}?referrer={p.referral_id}
          </p>
          <Copier
            text={`${BASE_URL}${appRoutes.register}/${regRoutes.welcome}?referrer=${p.referral_id}`}
            classes={{
              container: "text-gray hover:text-gray-d1 ml-2",
              icon: "size-5",
            }}
            size={20}
          />
        </div>
      </div>
    </div>
  );
}
