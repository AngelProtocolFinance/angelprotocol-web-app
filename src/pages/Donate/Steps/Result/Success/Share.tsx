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
  iconSize,
}: {
  type: SocialMedia;
  iconSize: number;
}) {
  const { showModal } = useModalContext();

  return (
    <button
      onClick={() => {
        showModal(Prompt, { type, iconSize });
      }}
      className="relative w-10 h-10 grid place-items-center border dark:border-white rounded"
    >
      <Icon type={type} size={iconSize} className="absolute-center" />
    </button>
  );
}

function Prompt({ type, iconSize }: { type: SocialMedia; iconSize: number }) {
  const { closeModal } = useModalContext();

  return (
    <Dialog.Panel className="grid content-start fixed-center z-20 bg-gray-l5 font-work text-gray-d2 w-full max-w-[39rem] rounded overflow-clip">
      <div className="grid place-items-center relative h-16 font-heading font-bold bg-orange-l5">
        Share on {type}
        <button
          onClick={closeModal}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10 border border-gray-l2 rounded"
        >
          <Icon type="Close" className="absolute-center" size={28} />
        </button>
      </div>
      <p className="my-10 mx-12 text-sm leading-normal p-3 border border-gray-l2 rounded">
        I just donated to @mothers2mothers on @AngelProtocol! Every gift is
        invested to provide sustainable funding for non-profits: Give once, give
        forever. Please join me in providing charities with financial freedom:
        https://app.angelprotocol.io
      </p>
      <BtnPrimary className="justify-self-center flex items-center justify-center gap-2 min-w-[16rem] mb-10">
        <div className="relative w-8 h-8 grid place-items-center border border-white rounded">
          <Icon type={type} className="absolute-center" size={iconSize} />
        </div>
        <span>Share now</span>
      </BtnPrimary>
    </Dialog.Panel>
  );
}
