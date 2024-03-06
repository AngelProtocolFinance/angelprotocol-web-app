import ExtLink from "components/ExtLink";
import Icon, { IconType } from "components/Icon";
import Modal from "components/Modal";
import { DAPP_URL } from "constants/env";
import { useModalContext } from "contexts/ModalContext";
import { useCallback, useState } from "react";
import { DonationRecipient } from "slices/donation";

export type SocialMedia = Extract<
  IconType,
  "FacebookCircle" | "Twitter" | "Telegram" | "Linkedin"
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
      className="relative size-10 grid place-items-center"
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
    <Modal className="grid content-start fixed-center z-20 border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 text-navy-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded overflow-hidden">
      <div className="grid place-items-center relative h-16 font-heading font-bold bg-orange-l5 dark:bg-blue-d7 border-b border-gray-l4">
        Share on {type === "FacebookCircle" ? "Facebook" : type}
        <button
          onClick={closeModal}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l4 rounded "
        >
          <Icon type="Close" className="absolute-center" size={28} />
        </button>
      </div>
      <p
        ref={msgRef}
        className="my-6 sm:my-10 mx-4 sm:mx-12 text-sm leading-normal p-3 border dark:bg-blue-d6 border-gray-l4 rounded"
      >
        I just donated to <span className="font-bold">{name}</span> on{" "}
        <span className="font-bold">"@angelgiving_</span>!{" "}
        {`Every gift is
        invested to provide sustainable funding for nonprofits: Give once, give
        forever. Help join the cause: ${DAPP_URL}`}
      </p>
      <ExtLink
        href={generateShareLink(shareText, type)}
        className="btn-orange btn-donate gap-2 min-w-[16rem] mb-6 sm:mb-10 mx-4 sm:justify-self-center sm:w-auto"
      >
        <div className="relative w-8 h-8 grid place-items-center border border-white rounded">
          <Icon type={type} className="absolute-center" size={iconSize} />
        </div>
        <span>Share now</span>
      </ExtLink>
    </Modal>
  );
}

function generateShareLink(rawText: string, type: SocialMedia) {
  const encodedText = encodeURIComponent(rawText);
  const encodedURL = encodeURIComponent(DAPP_URL);
  switch (type) {
    case "Twitter":
      //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
      return `https://twitter.com/intent/tweet?text=${encodedText}`;
    /**
     * feed description is depracated
     * https://developers.facebook.com/docs/sharing/reference/feed-dialog#response
     * must rely on OpenGraph metadata
     */
    case "FacebookCircle":
      return `https://www.facebook.com/dialog/share?app_id=1286913222079194&display=popup&href=${encodeURIComponent(
        DAPP_URL
      )}&quote=${encodedText}`;

    //https://core.telegram.org/widgets/share#custom-buttons
    case "Telegram":
      return `https://telegram.me/share/url?url=${encodedURL}&text=${encodedText}`;

    //Linkedin
    default:
      return `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
  }
}
