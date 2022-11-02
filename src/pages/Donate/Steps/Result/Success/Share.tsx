import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import Icon, { IconTypes } from "components/Icon";
import { BtnPrimary } from "components/donation";

type SocialMedia = Extract<
  IconTypes,
  "Facebook" | "Twitter" | "Instagram" | "Telegram" | "Discord"
>;

export default function Share({
  type,
  size,
}: {
  type: SocialMedia;
  size: number;
}) {
  const { showModal } = useModalContext();

  return (
    <button
      onClick={() => {
        showModal(Prompt, { type });
      }}
      className="relative w-10 h-10 grid place-items-center border dark:border-white rounded"
    >
      <Icon type={type} size={size} className="absolute-center" />
    </button>
  );
}

function Prompt({ type }: { type: SocialMedia }) {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="grid content-start fixed-center z-20 bg-gray-l5 font-work text-gray-d2 w-full max-w-[39rem] rounded overflow-clip">
      <div className="grid place-items-center relative h-16 bg-orange-l5 font-heading font-bold">
        Share on Facebook
        <button onClick={closeModal} className="absolute right-0 top-0">
          <Icon type="Close" />
        </button>
      </div>
      <p className="my-10 mx-12 text-sm leading-normal p-3 border border-gray-l2 rounded">
        I just donated to @mothers2mothers on @AngelProtocol! Every gift is
        invested to provide sustainable funding for non-profits: Give once, give
        forever. Please join me in providing charities with financial freedom:
        https://app.angelprotocol.io
      </p>
      <BtnPrimary>
        <Icon type={type} />
        <span>Share now</span>
      </BtnPrimary>
    </Dialog.Panel>
  );
}
