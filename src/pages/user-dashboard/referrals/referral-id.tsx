import Copier from "components/copier";

interface ReferralIdProps {
  classes?: string;
}

export function ReferralId({ classes = "" }: ReferralIdProps) {
  return (
    <div className={classes}>
      <h2 className="text-2xl font-semibold text-gray-d4 mb-4">My referrals</h2>
      <div className="bg-gray-l5 p-6 rounded-xl border border-gray-l4">
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-l1 mb-1">
            REFERRAL ID
          </div>
          <div className="flex items-center">
            <div className="text-xl font-semibold mr-2">XYZ-1234</div>
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
            <div className="text-gray-d4 truncate max-w-xs">
              https://better.giving...
            </div>
            <Copier
              text="https://better.giving.com/ref/XYZ-1234"
              classes={{
                container: "text-gray hover:text-gray-d1 ml-2",
                icon: "size-5",
              }}
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
