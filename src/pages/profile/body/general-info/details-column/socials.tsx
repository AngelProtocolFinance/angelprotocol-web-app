import type { Endow } from "@better-giving/endowment";
import discordIcon from "assets/icons/social/discord.svg";
import facebookIcon from "assets/icons/social/facebook.webp";
import instagramIcon from "assets/icons/social/instagram.webp";
import linkedinIcon from "assets/icons/social/linkedin.webp";
import tiktokIcon from "assets/icons/social/tiktok.webp";
import xIcon from "assets/icons/social/x.webp";
import youtubeIcon from "assets/icons/social/youtube.webp";
import ExtLink from "components/ext-link";

export default function Socials(props: Pick<Endow, "social_media_urls">) {
  const { facebook, linkedin, twitter, discord, instagram, youtube, tiktok } =
    props.social_media_urls;
  return (
    <div className="flex items-center gap-4">
      {facebook && <SocialsIcon href={facebook} src={facebookIcon} size={22} />}
      {linkedin && <SocialsIcon href={linkedin} src={linkedinIcon} size={24} />}
      {twitter && <SocialsIcon href={twitter} src={xIcon} size={18} />}
      {discord && <SocialsIcon href={discord} src={discordIcon} size={25} />}
      {instagram && (
        <SocialsIcon href={instagram} src={instagramIcon} size={20} />
      )}
      {youtube && <SocialsIcon href={youtube} src={youtubeIcon} size={22} />}
      {tiktok && <SocialsIcon href={tiktok} src={tiktokIcon} size={21} />}
    </div>
  );
}

const SocialsIcon = (props: { href: string; src: string; size: number }) => (
  <ExtLink href={props.href}>
    <img src={props.src} width={props.size} />
  </ExtLink>
);
