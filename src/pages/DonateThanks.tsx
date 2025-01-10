import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { type LoaderFunction, data } from "@vercel/remix";
import char from "assets/images/celebrating-character.png";
import { cognito } from "auth";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import Seo from "components/Seo";
import { Share } from "components/donation";
import { BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { decodeState } from "helpers/state-params";
import type { UserV2 } from "types/auth";
import type { DonateThanksState } from "types/pages";

interface Data {
  user: UserV2 | null;
  state: DonateThanksState | null;
}
export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  const url = new URL(request.url);
  return data(
    {
      user: user,
      state: decodeState(url.searchParams.get("_s")),
    } satisfies Data,
    { headers }
  );
};

export default function DonateThanks() {
  const widgetVersion = useOutletContext<true | undefined>();
  const { state } = useLoaderData() as Data;

  return (
    <div className="grid place-self-center max-w-[35rem] px-4 py-8 sm:py-20 scroll-mt-6">
      {/** override default scripts when used inside iframe */}
      <Seo scripts={widgetVersion ? [] : undefined} />
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
        {widgetVersion ? (
          <ExtLink
            className="text-blue"
            href={`${BASE_URL}${appRoutes.user_dashboard}/donations`}
          >
            My Donations
          </ExtLink>
        ) : (
          <Link
            to={`${appRoutes.user_dashboard}/donations`}
            className="text-blue"
          >
            My Donations page.
          </Link>
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
