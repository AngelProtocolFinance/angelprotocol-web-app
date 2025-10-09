import facebook from "assets/icons/social/facebook.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import telegram from "assets/icons/social/telegram.webp";
import x from "assets/icons/social/x.webp";
import { APP_NAME, BASE_URL } from "constants/env";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { href } from "react-router";
import { ExtLink } from "../../ext-link";
import { Modal } from "../../modal";
import { type DonationRecipient, is_fund } from "./types";

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

interface Recipient extends Pick<DonationRecipient, "id" | "name"> {}

interface Props extends Recipient {
  classes?: string;
}

export function Share({ classes = "", ...recipient }: Props) {
  return (
    <div className={`${classes} grid justify-items-center py-2`}>
      <h2 className="w-full pt-2 text-center font-medium text-[color:var(--accent-primary)] mb-2">
        Spread the word!
      </h2>
      <p className="text-center text-gray text-sm max-w-sm">
        Encourage your friends to join in and contribute, making a collective
        impact through donations.
      </p>
      <div className="flex items-center gap-2 mt-1">
        {socials.map((s) => (
          <ShareBtn key={s.id} {...s} recipient={recipient} />
        ))}
      </div>
    </div>
  );
}

interface IShareBtn extends SocialMedia {
  recipient: Recipient;
}
function ShareBtn(props: IShareBtn) {
  const [open, set_open] = useState(false);

  return (
    <>
      <button
        onClick={() => set_open(true)}
        className="relative size-10 grid place-items-center"
      >
        <img src={props.src} width={props.size} className="absolute-center" />
      </button>
      <Prompt {...props} open={open} set_open={set_open} />
    </>
  );
}

interface IPrompt extends IShareBtn {
  open: boolean;
  set_open: React.Dispatch<React.SetStateAction<boolean>>;
}

function Prompt({ recipient, open, set_open, ...social }: IPrompt) {
  //share_txt will always hold some values
  const [share_txt, set_share_txt] = useState("");
  const msgRef = useCallback((node: HTMLParagraphElement | null) => {
    if (node) {
      set_share_txt(node.innerText);
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => set_open(false)}
      classes="grid content-start fixed-center z-20 border border-gray-l3 bg-gray-l6 dark:bg-blue-d5 text-gray-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded-sm overflow-hidden"
    >
      <div className="grid place-items-center relative h-16  font-bold bg-blue-l5 dark:bg-blue-d7 border-b border-gray-l3">
        Share on {social.title}
        <button
          onClick={() => set_open(false)}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l3 rounded-sm "
        >
          <X size={20} className="absolute-center" />
        </button>
      </div>
      <p
        ref={msgRef}
        className="my-6 sm:my-10 mx-4 sm:mx-12 text-sm leading-normal p-3 border dark:bg-blue-d6 border-gray-l3 rounded-sm"
      >
        I just donated to <span className="font-bold">{recipient.name}</span> on{" "}
        <span className="font-bold">@BetterDotGiving</span>!{" "}
        {is_fund(recipient.id)
          ? "My gift to this fundraiser helps raise funds for causes they love. Why don't you donate as well?"
          : "They can choose to use my gift today, or save and invest it for sustainable growth"}
        . When you give today, you give forever.
      </p>
      <ExtLink
        href={gen_share_link(share_txt, social.id, recipient)}
        className="btn btn-outline btn-donate hover:bg-blue-l4 gap-2 min-w-[16rem] mb-6 sm:mb-10 mx-4 sm:justify-self-center sm:w-auto"
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

function gen_share_link(
  raw_txt: string,
  type: SocialMedia["id"],
  recipient: Recipient
) {
  const path = is_fund(recipient.id)
    ? href("/donate-fund/:fundId", {
        fundId: recipient.id,
      })
    : href("/donate/:id", {
        id: recipient.id,
      });
  const donate_url = `${BASE_URL}${path}`;

  switch (type) {
    case "x":
      //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
      return `https://x.com/intent/tweet?text=${encodeURIComponent(`${raw_txt} ${donate_url}`)}`;
    /**
     * feed description is depracated
     * https://developers.facebook.com/docs/sharing/reference/feed-dialog#response
     * NOTE 6/3/2024: must rely on OpenGraph metadata
     */
    case "fb":
      return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodeURIComponent(
        `${BASE_URL}/${href("/donate-thanks")}?name=${recipient.name}&id=${recipient.id}`
      )}&quote=${encodeURIComponent(raw_txt)}`;

    //https://core.telegram.org/widgets/share#custom-buttons
    case "telegram":
      return `https://telegram.me/share/url?url=${encodeURIComponent(donate_url)}&text=${encodeURIComponent(raw_txt)}`;

    //Linkedin
    default:
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${raw_txt} ${donate_url}`)}`;
  }
}
