import char from "assets/images/celebrating-character.png";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import Signup from "components/Signup";
import { DAPP_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { Link, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { GuestDonor } from "types/aws";

export default function DonateFiatThanks({ widgetVersion = false }) {
  const location = useLocation();
  const guestDonor: GuestDonor | undefined = location.state;
  const user = useGetter((state) => state.auth.user);

  return (
    <div className="grid justify-self-center m-auto max-w-[35rem] px-4 py-8 sm:py-20 scroll-mt-6">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} />
      </div>
      <p className="uppercase mb-2 text-xs text-blue-d1 text-center">
        Donation successful
      </p>
      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>
      <p className="text-center text-navy-l1">
        We'll process your donation to the nonprofit you specified as soon as
        the payment has cleared.
        {widgetVersion
          ? ""
          : " You can safely navigate away using the button below."}
      </p>
      <p className="text-center text-navy-l1 mt-8 mb-2 text-[15px]">
        If you need a receipt for your donation, please fill out the KYC form
        for this transaction on your{" "}
        {widgetVersion ? (
          <ExtLink href={`${DAPP_URL}${appRoutes.donations}`}>
            My donations
          </ExtLink>
        ) : (
          <Link to={appRoutes.donations}>My donations</Link>
        )}{" "}
        page.
      </p>

      {!userIsSignedIn(user) && guestDonor && (
        <Signup
          classes="max-w-96 w-full mt-6 justify-self-center"
          donor={((d) => {
            const [firstName, lastName] = d.fullName.split(" ");
            return { firstName, lastName, email: d.email };
          })(guestDonor)}
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
