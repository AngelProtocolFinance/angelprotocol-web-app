import {
  Link,
  NavLink,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import char from "assets/images/celebrating-character.webp";
import { Share } from "components/donation";
import ExtLink from "components/ext-link";
import Image from "components/image";
import { BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";

export default function DonateThanks() {
  const widgetVersion = useOutletContext<true | undefined>();
  const [params] = useSearchParams();
  const recipientName = params.get("recipient_name");

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
      <p className="text-center text-gray">
        We'll process your donation to{" "}
        {recipientName ?? "the nonprofit you specified"} as soon as the payment
        has cleared.
        {widgetVersion
          ? ""
          : " You can safely navigate away using the button below."}
      </p>

      <Share
        recipientName={recipientName ?? "a nonprofit"}
        className="mt-6 border border-gray-l3 rounded-xl"
      />

      <p className="text-center text-gray mt-8 mb-2 text-[15px]">
        {widgetVersion ? (
          <ExtLink
            className="text-blue"
            href={`${BASE_URL}${appRoutes.user_dashboard}/donations`}
          >
            My Donations
          </ExtLink>
        ) : (
          <NavLink
            to={`${appRoutes.user_dashboard}/donations`}
            className="text-blue [&:is(.pending)]:text-gray"
          >
            My Donations page
          </NavLink>
        )}{" "}
      </p>

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
