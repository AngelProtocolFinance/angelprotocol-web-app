import { Copier } from "components/copier";
import { appRoutes, regRoutes } from "constants/routes";
import { Link } from "react-router";

interface Props {
  classes?: string;
  referral_id: string;
  base_url: string;
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
            text={p.referral_id}
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
            {p.base_url}
            {appRoutes.register}/{regRoutes.welcome}?referrer={p.referral_id}
          </p>
          <Copier
            text={`${p.base_url}${appRoutes.register}/${regRoutes.welcome}?referrer=${p.referral_id}`}
            classes={{
              container: "text-gray hover:text-gray-d1 ml-2",
              icon: "size-5",
            }}
            size={20}
          />
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-l1">
        By sharing your referral link or code, you agree to our{" "}
        <Link
          target="_blank"
          to="/terms-of-use-referrals"
          className="text-blue hover:text-blue-d1"
        >
          Referral Program Terms of Use
        </Link>
        .
      </div>
    </div>
  );
}
