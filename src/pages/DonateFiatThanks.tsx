import char from "assets/images/celebrating-character.png";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import Signup from "components/Signup";
import { Share } from "components/donation";
import { BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { Link, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { GuestDonor } from "types/aws";

export type DonateFiatThanksState = {
  guestDonor?: GuestDonor;
  recipientName?: string;
  recipientId?: number;
};

export default function DonateFiatThanks({ widgetVersion = false }) {
  const location = useLocation();
  const state: DonateFiatThanksState | undefined = location.state;
  const user = useGetter((state) => state.auth.user);

  return (
    <div className="grid place-self-center max-w-[35rem] px-4 py-8 sm:py-20 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} />
      </div>
      <p className="uppercase mb-2 font-bold text-xs text-blue-d1 text-center">
        Donation Successful
      </p>
      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>
      <p className="text-center text-navy-l1">
        We'll process your donation to{" "}
        {state?.recipientName ?? "the nonprofit you specified"} as soon as the
        payment has cleared.
        {widgetVersion
          ? ""
          : " You can safely navigate away using the button below."}
      </p>

      <Share
        recipientName={state?.recipientName ?? "a nonprofit"}
        className="mt-6 border border-gray-l3 rounded-xl"
      />

      <p className="text-center text-navy-l1 mt-8 mb-2 text-[15px]">
        If you need a receipt for your donation, please fill out the KYC form
        for this transaction on your{" "}
        {widgetVersion ? (
          <ExtLink href={`${BASE_URL}${appRoutes.user_dashboard}/donations`}>
            My Donations
          </ExtLink>
        ) : (
          <Link to={`${appRoutes.user_dashboard}/donations`}>My Donations</Link>
        )}{" "}
        page.
      </p>

      {!userIsSignedIn(user) && state?.guestDonor && (
        <Signup
          classes="max-w-96 w-full mt-6 justify-self-center"
          donor={((d) => {
            const [firstName, lastName] = d.fullName.split(" ");
            return { firstName, lastName, email: d.email };
          })(state.guestDonor)}
        />
      )}

      {!widgetVersion && (
        <Link
          to={appRoutes.marketplace}
          className="btn-outline h-[3.25rem] font-heading max-w-96 w-full justify-self-center normal-case mt-4 rounded-full"
        >
          Back to the platform
        </Link>
      )}
    </div>
  );
}
