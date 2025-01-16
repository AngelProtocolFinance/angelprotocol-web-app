import facebook from "assets/icons/social/facebook.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import telegram from "assets/icons/social/telegram.webp";
import x from "assets/icons/social/x.webp";
import { APP_NAME, BASE_URL } from "constants/env";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import ExtLink from "../../ExtLink";
import { Modal } from "../../Modal";

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
};

export default function ShareContainer(props: ShareProps) {
  return (
    <div className={`${props.className ?? ""} grid justify-items-center py-2`}>
      <h2 className="w-full pt-2 text-center font-medium text-[color:var(--accent-primary)] mb-2">
        Spread the word!
      </h2>
      <p className="text-center text-navy-l1 text-sm max-w-sm">
        Encourage your friends to join in and contribute, making a collective
        impact through donations.
      </p>
      <div className="flex items-center gap-2 mt-1">
        {socials.map((s) => (
          <Share key={s.id} {...s} recipientName={props.recipientName} />
        ))}
      </div>
    </div>
  );
}

interface IShare extends SocialMedia {
  recipientName: string;
}
function Share(props: IShare) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative size-10 grid place-items-center"
      >
        <img src={props.src} width={props.size} className="absolute-center" />
      </button>
      <Prompt {...props} open={open} setOpen={setOpen} />
    </>
  );
}

interface IPrompt extends IShare {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Prompt({ recipientName, open, setOpen, ...social }: IPrompt) {
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
      classes="grid content-start fixed-center z-20 border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 text-navy-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded overflow-hidden"
    >
      <div className="grid place-items-center relative h-16 font-heading font-bold bg-blue-l5 dark:bg-blue-d7 border-b border-gray-l4">
        Share on {social.title}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l4 rounded "
        >
          <X size={20} className="absolute-center" />
        </button>
      </div>
      <p
        ref={msgRef}
        className="my-6 sm:my-10 mx-4 sm:mx-12 text-sm leading-normal p-3 border dark:bg-blue-d6 border-gray-l4 rounded"
      >
        I just donated to The Better Giving 501(c)(3) on{" "}
        <span className="font-bold">@BetterDotGiving</span>! They can choose to
        use my gift today, or save and invest it for sustainable growth. When
        you give today, you give forever. Join me:{" "}
        <a href={BASE_URL} className="font-bold">
          https://better.giving
        </a>
        .
      </p>
      <ExtLink
        href={generateShareLink(shareText, social.id)}
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

function generateShareLink(rawText: string, type: SocialMedia["id"]) {
  const encodedText = encodeURIComponent(rawText);
  const encodedURL = encodeURIComponent(BASE_URL);
  switch (type) {
    case "x":
      //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
      return `https://x.com/intent/tweet?text=${encodedText}`;
    /**
     * feed description is depracated
     * https://developers.facebook.com/docs/sharing/reference/feed-dialog#response
     * NOTE 6/3/2024: must rely on OpenGraph metadata
     */
    case "fb":
      return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodeURIComponent(
        BASE_URL
      )}&quote=${encodedText}`;

    //https://core.telegram.org/widgets/share#custom-buttons
    case "telegram":
      return `https://telegram.me/share/url?url=${encodedURL}&text=${encodedText}`;

    //Linkedin
    default:
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
  }
}
