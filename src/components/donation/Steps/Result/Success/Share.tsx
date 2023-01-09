import { Dialog } from "@headlessui/react";
import { useCallback, useState } from "react";
import { useModalContext } from "contexts/ModalContext";
import Icon, { IconTypes } from "components/Icon";
import { BtnPrimary } from "components/donation";
import { DonationRecipient } from "slices/donation";

export type SocialMedia = Extract<
  IconTypes,
  "Facebook" | "Twitter" | "Telegram" | "Linkedin"
>;

type Props = {
  type: SocialMedia;
  iconSize: number;
  recipient: DonationRecipient;
};

export default function Share(props: Props) {
  const { type, iconSize } = props;
  const { showModal } = useModalContext();

  return (
    <button
      onClick={() => {
        showModal(Prompt, props);
      }}
      className="relative w-10 h-10 grid place-items-center border dark:border-white rounded"
    >
      <Icon type={type} size={iconSize} className="absolute-center" />
    </button>
  );
}

function Prompt({ type, iconSize, recipient: { name } }: Props) {
  const { closeModal } = useModalContext();

  //shareText will always hold some value
  const [shareText, setShareText] = useState("");
  const msgRef = useCallback((node: HTMLParagraphElement | null) => {
    if (node) {
      setShareText(node.innerText);
    }
  }, []);

  return (
    <Dialog.Panel className="grid content-start fixed-center z-20 border border-gray-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d5 font-work text-gray-d2 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded overflow-hidden">
      <div className="grid place-items-center relative h-16 font-heading font-bold bg-orange-l5 dark:bg-blue-d7 border-b border-gray-l2 dark:border-bluegray">
        Share on {type}
        <button
          onClick={closeModal}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l2 rounded dark:border-bluegray"
        >
          <Icon type="Close" className="absolute-center" size={28} />
        </button>
      </div>
      <p
        ref={msgRef}
        className="my-6 sm:my-10 mx-4 sm:mx-12 text-sm leading-normal p-3 border dark:bg-blue-d6 border-gray-l2 dark:border-bluegray rounded"
      >
        I just donated to <span className="font-bold">{name}</span> on{" "}
        <span className="font-bold">@AngelProtocol</span>! Every gift is
        invested to provide sustainable funding for non-profits: Give once, give
        forever. Help join the cause: https://app.angelprotocol.io
      </p>
      <BtnPrimary
        as="a"
        href={generateShareLink(shareText, type)}
        className="flex items-center justify-center gap-2 min-w-[16rem] mb-6 sm:mb-10 mx-4 sm:justify-self-center sm:w-auto"
      >
        <div className="relative w-8 h-8 grid place-items-center border border-white rounded">
          <Icon type={type} className="absolute-center" size={iconSize} />
        </div>
        <span>Share now</span>
      </BtnPrimary>
    </Dialog.Panel>
  );
}

const APP_URL = "https://app.angelprotocol.io";
function generateShareLink(rawText: string, type: SocialMedia) {
  const encodedText = encodeURIComponent(rawText);
  const encodedURL = encodeURIComponent(APP_URL);
  switch (type) {
    case "Twitter":
      //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
      return `https://twitter.com/intent/tweet?text=${encodedText}`;
    /**
     * feed description is depracated
     * https://developers.facebook.com/docs/sharing/reference/feed-dialog#response
     * must rely on OpenGraph metadata
     */
    case "Facebook":
      return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodeURIComponent(
        APP_URL
      )}&quote=${encodedText}`;

    //https://core.telegram.org/widgets/share#custom-buttons
    case "Telegram":
      return `https://telegram.me/share/url?url=${encodedURL}&text=${encodedText}`;

    //Linkedin
    default:
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
  }
}
