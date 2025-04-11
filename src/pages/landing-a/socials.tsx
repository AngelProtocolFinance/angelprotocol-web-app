import facebook from "assets/icons/social/facebook.webp";
import instagram from "assets/icons/social/instagram.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import x from "assets/icons/social/x.webp";
import youtube from "assets/icons/social/youtube.webp";
import ExtLink from "components/ext-link";
import { socials } from "constants/urls";
export default function Socials({ classes = "" }) {
  return (
    <div className={`flex items-center gap-3 md:gap-6 ${classes}`}>
      <ExtLink
        href={socials.linkedin}
        className="hover:scale-110 active:scale-110"
      >
        <img src={linkedin} alt="linkedin" width={20} />
      </ExtLink>
      <ExtLink
        href={socials.facebook}
        className="hover:scale-110 active:scale-110"
      >
        <img src={facebook} alt="facebook" width={18} />
      </ExtLink>
      <ExtLink href={socials.x} className="hover:scale-110 active:scale-110">
        <img src={x} alt="x" width={15} />
      </ExtLink>
      <ExtLink
        href={socials.youtube}
        className="hover:scale-110 active:scale-110"
      >
        <img src={youtube} alt="youtube" width={21} />
      </ExtLink>
      <ExtLink
        href={socials.instagram}
        className="hover:scale-110 active:scale-110"
      >
        <img src={instagram} alt="instagram" width={18} />
      </ExtLink>
    </div>
  );
}
