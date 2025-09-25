import facebook from "assets/icons/social/facebook.webp";
import flickr from "assets/icons/social/flickr.webp";
import instagram from "assets/icons/social/instagram.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import tiktok from "assets/icons/social/tiktok.webp";
import x from "assets/icons/social/x.webp";
import youtube from "assets/icons/social/youtube.webp";
import ExtLink from "components/ext-link";
import Image from "components/image";
import {} from "lucide-react";
import type { SocialMedia } from "types/mongodb/nonprofits";

interface Props {
  socials: SocialMedia[];
}

export const icons: { [name: string]: [string, number] } = {
  facebook: [facebook, 13],
  instagram: [instagram, 12],
  linkedin: [linkedin, 12],
  x: [x, 10],
  twitter: [x, 10],
  "x-twitter": [x, 10],
  youtube: [youtube, 14],
  tiktok: [tiktok, 12],
  flickr: [flickr, 12],
};

export function Socials(props: Props) {
  return (
    <div className="flex max-w-40 items-center flex-wrap gap-2">
      {props.socials.map((x, idx) => {
        const [href = "", size = 10] = icons[x.name.toLowerCase()] ?? [];
        return (
          <ExtLink
            key={x.name + idx}
            href={x.url}
            className="grid whitespace-normal"
          >
            {<Image src={href} width={size} height={size} />}
          </ExtLink>
        );
      })}
    </div>
  );
}
