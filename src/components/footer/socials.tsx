import facebook from "assets/icons/social/facebook.webp";
import instagram from "assets/icons/social/instagram.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import x from "assets/icons/social/x.webp";
import youtube from "assets/icons/social/youtube.webp";
import ExtLink from "../ext-link";

export default function Socials() {
  return (
    <div className="flex items-center gap-3 md:gap-6">
      <ExtLink
        href="https://www.linkedin.com/company/better-giving/"
        className="hover:scale-110 active:scale-110"
      >
        <img src={linkedin} alt="linkedin" width={20} />
      </ExtLink>
      <ExtLink
        href="https://www.facebook.com/BetterGivingFB/"
        className="hover:scale-110 active:scale-110"
      >
        <img src={facebook} alt="facebook" width={18} />
      </ExtLink>
      <ExtLink
        href="https://x.com/BetterDotGiving"
        className="hover:scale-110 active:scale-110"
      >
        <img src={x} alt="x" width={15} />
      </ExtLink>
      <ExtLink
        href="https://www.youtube.com/@BetterDotGiving"
        className="hover:scale-110 active:scale-110"
      >
        <img src={youtube} alt="youtube" width={21} />
      </ExtLink>
      <ExtLink
        href="https://www.instagram.com/better.giving"
        className="hover:scale-110 active:scale-110"
      >
        <img src={instagram} alt="discord" width={18} />
      </ExtLink>
    </div>
  );
}
