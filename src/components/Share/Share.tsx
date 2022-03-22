import { getIcon, IconTypes } from "components/Icons/Icons";
import {
  encodedText,
  FACEBOOK_DIALOG_URL,
  LINKEDIN_SHARE_URL,
  TWITTER_SHARE_URL,
} from "./constants";

export default function Share() {
  return (
    <div className="md:p-4">
      <div className="text-3xl md:text-5xl uppercase text-thin-blue text-center font-bold">
        <p className="md:mb-2">let the</p>
        <p className="mb-3 md:mb-6">world know!</p>
      </div>
      <div className="rounded-xl bg-white-grey p-3 w-2/3 flex justify-center mx-auto">
        <span className="text-gray-400 text-sm">
          {decodeURIComponent(encodedText)}
        </span>
      </div>
      <div className="flex justify-center my-5 ">
        <IconLink link={TWITTER_SHARE_URL} icon={getIcon(IconTypes.Twitter)} />
        <IconLink
          link={LINKEDIN_SHARE_URL}
          icon={getIcon(IconTypes.Linkedin)}
        />
        <IconLink
          link={FACEBOOK_DIALOG_URL}
          icon={getIcon(IconTypes.Facebook)}
        />
      </div>
    </div>
  );
}

type IconLinkProps = {
  link: string;
  icon: React.ComponentType<any>;
};

const IconLink = ({ link, icon: Icon }: IconLinkProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1 text-3xl text-thin-blue"
    >
      <Icon />
    </a>
  );
};
