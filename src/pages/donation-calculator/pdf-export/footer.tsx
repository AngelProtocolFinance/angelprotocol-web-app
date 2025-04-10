import facebook from "assets/icons/social/facebook.webp";
import instagram from "assets/icons/social/instagram.webp";
import intercom from "assets/icons/social/intercom.svg";
import linkedin from "assets/icons/social/linkedin.webp";
import x from "assets/icons/social/x.webp";
import youtube from "assets/icons/social/youtube.webp";
import ExtLink from "components/ext-link";
import { INTERCOM_HELP } from "constants/env";

function Socials({ classes = "" }) {
  return (
    <div className={`flex  gap-3 md:gap-6 ${classes}`}>
      <ExtLink
        href="https://www.linkedin.com/company/better-giving/"
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img
          className="absolute-center left-[26px]  p-1"
          src={linkedin}
          alt="linkedin"
          width={40}
          height={28}
        />
      </ExtLink>
      <ExtLink
        href="https://www.facebook.com/BetterGivingFB/"
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img
          className="absolute-center p-1"
          src={facebook}
          alt="facebook"
          width={36}
          height={28}
        />
      </ExtLink>
      <ExtLink
        href="https://x.com/BetterDotGiving"
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img className="absolute-center p-1" src={x} alt="x" width={30} />
      </ExtLink>
      <ExtLink
        href="https://www.youtube.com/@BetterDotGiving"
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img
          className="absolute-center p-1"
          src={youtube}
          alt="youtube"
          width={42}
          height={28}
        />
      </ExtLink>
      <ExtLink
        href="https://www.instagram.com/better.giving"
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img
          className="absolute-center p-1"
          src={instagram}
          alt="discord"
          width={36}
          height={28}
        />
      </ExtLink>
      <ExtLink
        href={INTERCOM_HELP}
        className="relative bg-white p-1 block shrink-0 size-12 rounded-lg"
      >
        <img
          className="absolute-center p-1"
          src={intercom}
          alt="discord"
          width={36}
          height={28}
        />
      </ExtLink>
    </div>
  );
}

export function Footer({ classes = "" }) {
  return (
    <div className={`bg-blue flex items-center p-8 ${classes}`}>
      <p className="text-4xl font-heading font-bold text-white text-nowrap">
        Keep in touch!
      </p>
      <Socials classes="ml-auto" />
      <p className="text-white max-w-lg ml-auto">
        Copyright © 4024 Better Giving. All rights reserved. The information
        provided by Better Giving in this material is for informational and
        illustrative purposes only, and is subject to change.
      </p>
    </div>
  );
}
