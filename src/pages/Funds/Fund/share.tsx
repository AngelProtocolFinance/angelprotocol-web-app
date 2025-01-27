import facebook from "assets/icons/social/facebook.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import telegram from "assets/icons/social/telegram.webp";
import x from "assets/icons/social/x.webp";
import ExtLink from "components/ExtLink";
import { Modal } from "components/Modal";
import { APP_NAME } from "constants/env";
import { X } from "lucide-react";
import { useCallback, useState } from "react";

interface SocialMedia {
  id: "x" | "telegram" | "linkedin" | "fb";
  title: string;
  src: string;
  size: number;
  handle: string;
}

const socials: SocialMedia[] = [
  {
    id: "linkedin",
    src: linkedin,
    title: "LinkedIn",
    size: 24,
    handle: APP_NAME,
  },
  { id: "fb", src: facebook, title: "Facebook", size: 21, handle: APP_NAME },
  { id: "x", src: x, title: "X", size: 16, handle: "@BetterDotGiving" },
  {
    id: "telegram",
    src: telegram,
    title: "Telegram",
    size: 22,
    handle: "@bettergiving",
  },
];

type ShareProps = {
  recipientName: string;
  className?: string;
  url: string;
};

export function Share(props: ShareProps) {
  return (
    <div className={`${props.className ?? ""} grid py-2`}>
      <h2 className="w-full pt-2 font-bold text-blue-d1 mb-2">
        Spread the word!
      </h2>
      <p className="text-navy-l1 text-sm max-w-sm">
        Encourage your friends to join in and contribute, making a collective
        impact through donations.
      </p>
      <div className="flex items-center gap-2 mt-1">
        {socials.map((s) => (
          <ShareBtn
            key={s.id}
            {...s}
            url={props.url}
            recipientName={props.recipientName}
          />
        ))}
      </div>
    </div>
  );
}

interface IShare extends SocialMedia {
  recipientName: string;
  url: string;
}
function ShareBtn(props: IShare) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative size-10 grid place-items-center"
    >
      <img src={props.src} width={props.size} className="absolute-center" />
      <Prompt {...props} open={open} setOpen={(o) => setOpen(o)} />
    </button>
  );
}

interface IPrompt extends SocialMedia {
  url: string;
  recipientName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function Prompt({ recipientName, open, setOpen, url, ...social }: IPrompt) {
  //shareText will always hold some value
  const [shareText, setShareText] = useState("");
  const msgRef = useCallback((node: HTMLParagraphElement | null) => {
    if (node) {
      setShareText(node.innerText);
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      classes="grid content-start fixed-center z-20 border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 text-navy-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded-sm overflow-hidden"
    >
      <div className="grid place-items-center relative h-16 font-heading font-bold bg-blue-l5 dark:bg-blue-d7 border-b border-gray-l4">
        Share on {social.title}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l4 rounded-sm "
        >
          <X className="absolute-center" width={35} />
        </button>
      </div>
      <p
        ref={msgRef}
        className="my-6 sm:my-10 mx-4 sm:mx-12 text-sm leading-normal p-3 border dark:bg-blue-d6 border-gray-l4 rounded-sm"
      >
        Donate to <span className="font-bold">{recipientName}</span> fundraiser
        on <span className="font-bold">{social.handle}</span>!{" "}
        {`Every gift is invested to provide sustainable funding for nonprofits: Give once, give forever. Help join the cause: ${new URL(url).origin}.`}
      </p>
      <ExtLink
        href={generateShareLink(shareText, social.id, url)}
        className="btn-outline btn-donate hover:bg-blue-l4 gap-2 min-w-[16rem] mb-6 sm:mb-10 mx-4 sm:justify-self-center sm:w-auto"
      >
        <div className="relative w-8 h-8 grid place-items-center">
          <img
            src={social.src}
            className="absolute-center"
            width={social.size}
          />
        </div>
        <span>Share now</span>
      </ExtLink>
    </Modal>
  );
}

function generateShareLink(
  rawText: string,
  type: SocialMedia["id"],
  url: string
) {
  const encodedText = encodeURIComponent(rawText);
  const encodedURL = encodeURIComponent(url);
  switch (type) {
    case "x":
      //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
      return `https://x.com/intent/tweet?text=${encodedText}&url=${encodedURL}`;
    /**
     * feed description is depracated
     * https://developers.facebook.com/docs/sharing/reference/feed-dialog#response
     * NOTE 6/3/2024: must rely on OpenGraph metadata
     */
    case "fb":
      return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodedURL}&quote=${encodedText}`;

    //https://core.telegram.org/widgets/share#custom-buttons
    case "telegram":
      return `https://telegram.me/share/url?url=${encodedURL}&text=${encodedText}`;

    //Linkedin
    default:
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
  }
}
