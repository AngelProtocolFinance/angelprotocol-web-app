import Icon, { IconTypes } from "components/Icon";

export default function Share() {
  return (
    <div className="md:p-4">
      <div className="text-3xl md:text-5xl uppercase text-thin-blue text-center font-bold">
        <p className="md:mb-2">let the</p>
        <p className="mb-3 md:mb-6">world know!</p>
      </div>
      <div className="rounded-xl bg-white-grey p-3 w-2/3 flex justify-center mx-auto">
        <span className="text-gray-400 text-sm">
          {decodeURIComponent(ENCODED_TEXT)}
        </span>
      </div>
      <div className="flex justify-center my-5 ">
        <IconLink link={TWITTER_SHARE_URL} iconType="Twitter" />
        <IconLink link={LINKEDIN_SHARE_URL} iconType="LinkedinIn" />
        <IconLink link={FACEBOOK_DIALOG_URL} iconType="Facebook" />
      </div>
    </div>
  );
}

const ENCODED_URL = "https%3A%2F%2Fwww.angelprotocol.io";
const ENCODED_TEXT = `I%20just%20donated%20on%20%40AngelProtocol%21%20Every%20gift%20is%20invested%20to%20provide%20sustainable%20funding%20for%20non-profits%3A%20Give%20once%2C%20give%20forever.%20Please%20join%20me%20in%20providing%20charities%20with%20financial%20freedom%3A%0A${ENCODED_URL}`;
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?text=${ENCODED_TEXT}`;
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/feed/?shareActive=true&text=${ENCODED_TEXT}`;
const FACEBOOK_DIALOG_URL = `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${ENCODED_URL}&quote=${ENCODED_TEXT}`;

type IconLinkProps = {
  link: string;
  iconType: IconTypes;
};

const IconLink = ({ link, iconType }: IconLinkProps) => {
  return (
    <a
      data-testid={iconType}
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1 text-3xl text-thin-blue"
    >
      <Icon type={iconType} />
    </a>
  );
};
